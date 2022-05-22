export class PatchImageSeriveDto{
  constructor(public readonly id: number, public readonly userdId: number, public readonly hits: number, public readonly uri: string){}
}