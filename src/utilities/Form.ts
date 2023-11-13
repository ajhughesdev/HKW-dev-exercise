interface ValidatorOptions {
  [key: string]: {
    value: string
    isRequired?: boolean
    isEmail?: boolean
    isTel?: boolean
    minLength?: number | undefined
  }
}

interface ValidatorResults {
  errors: {
    [key: string]: string[]
  }
}

class Form {
  /**
   * Validate email address
   * @param email
   * @returns boolean
   */
  static validEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Check if email matches the regular expression
    if (!emailRegex.test(email)) {
      return false
    }

    // Check if email has a valid domain name
    const domain = email.split('@')[1]
    if (!domain) {
      return false
    }
    const domainParts = domain.split('.')
    if (domainParts.length < 2) {
      return false
    }
    const tld = domainParts[domainParts.length - 1]
    if (tld.length < 2 || tld.length > 4) {
      return false
    }

    return true
  }

  /**
   * Validate phone number
   * @param tel
   * @returns boolean
   */
  static validTel(tel: string): boolean {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

    if (!phoneRegex.test(tel)) {
      return false
    }
    return true
  }

  /**
   * Minimum length of string
   * @param str
   * @param length
   * @returns boolean
   */
  static minLength(str: string, length: number): boolean {
    let isInvalid = false

    if (str.length < length) {
      isInvalid = true
    }

    return isInvalid
  }

  /**
   * Modify indefinite article
   * @param str
   * @returns string
   */
  static indefiniteArticle(word: string): string {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    if (vowels.includes(word[0].toLowerCase())) {
      return 'An'
    }
    return 'A'
  }

  /**
   * Form Validator
   * @param obj
   * @returns
   */
  static validator(obj: ValidatorOptions): ValidatorResults | null {
    let keys = Object.entries(obj)
    let results: { [key: string]: string[] }[] = []
    let validations = null

    keys.map((key) => {
      if ('isRequired' in key[1] && key[1].isRequired) {
        if (key[1].value.length === 0) {
          const article = Form.indefiniteArticle(key[0])
          results.push({
            [key[0]]: [`${article} ${key[0]} is required.`],
          })
        } else {
          if ('isEmail' in key[1] && key[1].isEmail) {
            let isValidEmail = Form.validEmail(key[1].value)
            if (!isValidEmail) {
              results.push({
                [key[0]]: [`Must be a valid email.`],
              })
            }
          }

          if ('isTel' in key[1] && key[1].isTel) {
            let isValidTel = Form.validTel(key[1].value)
            if (!isValidTel) {
              results.push({
                [key[0]]: [`Must be a valid telephone number.`],
              })
            }
          }

          if (
            'minLength' in key[1] &&
            Form.minLength(key[1].value, key[1].minLength || 0)
          ) {
            results.push({
              [key[0]]: [
                `Must be at least ${key[1].minLength || 0} characters.`,
              ],
            })
          }
        }
      } else if ('isEmail' in key[1]) {
        let isValidEmail = Form.validEmail(key[1].value)
        if (!isValidEmail) {
          results.push({
            [key[0]]: [`Must be a valid email.`],
          })
        }
      } else if (
        'minLength' in key[1] &&
        Form.minLength(key[1].value, key[1].minLength || 0)
      ) {
        results.push({
          [key[0]]: [`Must be at least ${key[1].minLength} characters.`],
        })
      }
      return results
    })

    results = Object.assign({}, ...results.map((result) => result))

    if (Object.keys(results).length > 0) {
      validations = {
        errors: results.reduce((acc, curr) => {
          return { ...acc, ...curr }
        }, {}),
      }
    } else {
      validations = null
    }

    return validations
  }
}

export default Form
