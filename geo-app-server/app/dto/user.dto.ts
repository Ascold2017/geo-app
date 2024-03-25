import { base64encode } from "nodejs-base64";
import { User, UserRoles } from "../entities/user.entity";

export class BaseUserDTO {
  public id: number;
  public username: string;
  public isPremium: boolean;
  public registeredAt: Date;
  
  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.isPremium = user.isPremium;
    this.registeredAt = new Date(+user.createdAt);
  }
}

export class UserDTO extends BaseUserDTO {
  public token: string;
  public role: UserRoles;
  public currentSectionId: number;
  constructor(user: User) {
    super(user);
    this.token = base64encode(`${user.username}:${user.password}`) as string;
    this.role = user.role as UserRoles;
    this.currentSectionId = user.currentSection ? user.currentSection.id : null;
  }
}
