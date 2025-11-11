// Role-based configuration for tabs visibility
export const ROLES = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium'
};

export const roleConfig = {
  [ROLES.BASIC]: {
    headerTabs: [1, 3, 6, 9],
    sidebarTabs: [1, 3, 6, 9],
    mainContentCards: [1, 3, 6, 9]
  },
  [ROLES.STANDARD]: {
    headerTabs: [1, 2, 4, 6, 8, 10],
    sidebarTabs: [1, 2, 4, 6, 8, 10],
    mainContentCards: [1, 2, 4, 6, 8, 10]
  },
  [ROLES.PREMIUM]: {
    headerTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    sidebarTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    mainContentCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
};

export const getVisibleTabs = (role, type) => {
  return roleConfig[role]?.[type] || [];
};
