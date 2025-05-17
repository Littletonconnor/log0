import { QuickActionButton } from "./quick-action-button";

export function NewResource() {
  return (
    <QuickActionButton iconName="Brain" label="New Resource">
      <span className="hidden md:block">New Resource</span>
      <span className="block md:hidden">New Res</span>
    </QuickActionButton>
  );
}
