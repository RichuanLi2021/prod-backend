export const USER_ROLES  = ['USER', 'SELLER'] as const;
export const PUBLIC_ROLE = ['USER'] as const;
export const SELLER_ROLE = ['SELLER'] as const;
export const ADMIN_ROLE = ['ADMIN'] as const;
export type Role = typeof USER_ROLES[number] | typeof ADMIN_ROLE[number];