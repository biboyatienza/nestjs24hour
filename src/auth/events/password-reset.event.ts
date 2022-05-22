export class PasswordResetEvent{
  constructor(public readonly email: string, public readonly passwordResetToken: string){}
}