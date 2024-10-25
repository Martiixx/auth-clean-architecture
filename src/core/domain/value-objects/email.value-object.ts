export class Email {
    private readonly email: string;

    private constructor(email: string) {
        this.email = email;
    }

    static create(email: string): Email {
        if(!this.validate(email)) {
            throw new Error('Invalid email!');
        }
        return new Email(email);
    }

    private static validate(email: string): boolean {
      const emailRegex = /^[\s@]+[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    getValue(): string {
      return this.email;
    }
}