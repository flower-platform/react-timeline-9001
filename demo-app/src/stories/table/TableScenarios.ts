import { createTestids } from "@famiprog-foundation/tests-are-demo";

export const tableScenarios = {
  propertyTable: 'PROPERTY table',
  propertyOnSplitChange:'PROPERTY onSplitChange'
};

// These are needed in TableTestsAreDemo
// Added here because they were needed in TableTestsAreDemo
// And could not be exported directly from table.storie.tsx because  
// everything exported there gets in the storybook tree as a story entry
export const tableTestIds = createTestids("Table", {row:""});
export const DEMO_TABLE_WIDTH = 275;