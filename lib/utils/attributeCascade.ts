// V3 Mopic Attribute Cascade Utility
// Resolves 4-attribute cascade: type → size → paper → theme

import { AttributeValue, AttributeRule } from '@/lib/types/project';
import { Workspace, PageConfig } from '@/lib/types/project';
import { TYPE_SIZE_RULES, SIZE_WORKSPACE_MAP, WORKSPACES } from '@/lib/data/workspaces';

/**
 * Get available sizes based on selected type and rules
 */
export function getAvailableSizes(
  selectedType: string,
  rules: AttributeRule[],
  allSizeValues: AttributeValue[]
): AttributeValue[] {
  // Find rule for this type
  const rule = rules.find(
    (r) => r.conditionValueKey === selectedType && r.isActive
  );

  if (!rule) {
    // No rule found, use static TYPE_SIZE_RULES
    const allowedKeys = TYPE_SIZE_RULES[selectedType] || [];
    return allSizeValues.filter(
      (v) => allowedKeys.includes(v.key) && v.isActive
    );
  }

  // Use dynamic rule
  return allSizeValues.filter(
    (v) => rule.allowedValueKeys.includes(v.key) && v.isActive
  );
}

/**
 * Resolve workspaces and page config from selected size
 */
export function resolveWorkspaces(
  selectedSize: string,
  sizeValues?: AttributeValue[]
): {
  coverWorkspace: Workspace | null;
  blockWorkspace: Workspace | null;
  pageConfigName: string;
} {
  // If we have AttributeValue data with workspace IDs, use that
  if (sizeValues) {
    const sizeValue = sizeValues.find((v) => v.key === selectedSize);
    if (sizeValue?.coverWorkspaceId && sizeValue?.blockWorkspaceId) {
      const coverWorkspace = Object.values(WORKSPACES).find(
        (w) => w.id === sizeValue.coverWorkspaceId
      );
      const blockWorkspace = Object.values(WORKSPACES).find(
        (w) => w.id === sizeValue.blockWorkspaceId
      );
      // PageConfigName would come from sizeValue.pageConfigId lookup
      return {
        coverWorkspace: coverWorkspace || null,
        blockWorkspace: blockWorkspace || null,
        pageConfigName: 'standard_24-24-100', // Default
      };
    }
  }

  // Otherwise use static SIZE_WORKSPACE_MAP
  const mapping = SIZE_WORKSPACE_MAP[selectedSize];
  if (!mapping) {
    return {
      coverWorkspace: null,
      blockWorkspace: null,
      pageConfigName: 'standard_24-24-100',
    };
  }

  return {
    coverWorkspace: WORKSPACES[mapping.cover] || null,
    blockWorkspace: WORKSPACES[mapping.block] || null,
    pageConfigName: mapping.pageConfig,
  };
}

/**
 * Get default selection for each attribute
 */
export function getDefaultAttributeSelection(
  attributeName: string,
  values: AttributeValue[]
): AttributeValue | null {
  const defaultValue = values.find((v) => v.isDefault && v.isActive);
  return defaultValue || (values.length > 0 ? values[0] : null);
}

/**
 * Validate attribute selection against rules
 */
export function validateAttributeSelection(
  selections: {
    type?: string;
    size?: string;
    paper?: string;
    theme?: string;
  },
  rules: AttributeRule[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check type → size rule
  if (selections.type && selections.size) {
    const rule = rules.find(
      (r) => r.conditionValueKey === selections.type && r.isActive
    );
    if (rule && !rule.allowedValueKeys.includes(selections.size)) {
      errors.push(`Size ${selections.size} is not allowed for type ${selections.type}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get available papers (no cascade rules for paper in V3)
 */
export function getAvailablePapers(
  allPaperValues: AttributeValue[]
): AttributeValue[] {
  return allPaperValues.filter((v) => v.isActive);
}

/**
 * Get available themes (no cascade rules for theme in V3)
 */
export function getAvailableThemes(
  allThemeValues: AttributeValue[]
): AttributeValue[] {
  return allThemeValues.filter((v) => v.isActive);
}
