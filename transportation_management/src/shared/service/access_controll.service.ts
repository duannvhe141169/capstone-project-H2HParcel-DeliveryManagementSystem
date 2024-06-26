import { Injectable } from '@nestjs/common';
import { Role } from '../../enum/roles.enum';

interface IsAuthorizedParams {
    currentRole: Role;
    requiredRole: Role;
}

@Injectable()
export class AccessControllService {
    private hierarchies: Array<Map<string, number>> = [];
    private priority: number = 1;

    // constructor() {
    //     this.buildRoles([Role.CUSTOMER, Role.SHIPPER, Role.STAFF, Role.MANAGER, .ADRoleMIN]);
    // }

    constructor() {
        this.buildRoles([Role.CUSTOMER]);
        this.buildRoles([Role.SHIPPER]);
        this.buildRoles([Role.STAFF, Role.MANAGER]);
        this.buildRoles([Role.ADMIN]);
    }

    private buildRoles(roles: Role[]) {
        const hierarchy: Map<string, number> = new Map();

        roles.forEach((role) => {
            hierarchy.set(role, this.priority);
            this.priority++;
        });

        this.hierarchies.push(hierarchy);
    }

    public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
        for (const hierarchy of this.hierarchies) {
            const priority = hierarchy.get(currentRole);
            const requiredPriority = hierarchy.get(requiredRole);
            if (priority && requiredPriority && priority >= requiredPriority) {
                return true;
            }
        }

        return false;
    }
}
