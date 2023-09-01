import React, { createContext } from "react";
import { Group } from "../types";

export const GanttContext = createContext<{rows: Group[], configureTable: (table: React.ReactNode) => React.ReactNode}>({rows: undefined, configureTable: undefined});