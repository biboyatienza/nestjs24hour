export class PostImageSeriveDto{
  constructor(public readonly userId: number, public readonly owner, public readonly uri: string){}
}