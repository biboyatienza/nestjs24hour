export class PostImageSeriveDto{
  constructor(public readonly id: number, public readonly userId: number, public readonly owner, public readonly uri: string){}
}