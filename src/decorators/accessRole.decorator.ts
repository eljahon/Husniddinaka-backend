import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ROLES_KEY } from "../constants";
import { RolesGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";

export function RoleEnabled(...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}