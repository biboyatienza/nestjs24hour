import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../types";

export const GetCurrentUserDecorator = createParamDecorator(
  (data: keyof JwtPayload | undefined, executionContext: ExecutionContext) => {
    const request = executionContext.switchToHttp().getRequest();
    if(!data) return request.user;
    return request.user[data];
  } 
)