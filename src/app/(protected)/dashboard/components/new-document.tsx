import { QuickActionButton } from "./quick-action-button";

export function NewDocument() {
  return (
    <form>
      <QuickActionButton iconName="FileText" label="New Document">
        <span className="hidden md:block">New Document</span>
        <span className="block md:hidden">New Doc</span>
      </QuickActionButton>
    </form>
  );
}
