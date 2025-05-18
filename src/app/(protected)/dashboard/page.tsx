import { AppHeader } from "./components/app-header";
import { NewDocument } from "./components/new-document";
import { NewResource } from "./components/new-resource";
import { RecentFiles } from "./components/recent-files";
import { Search } from "./components/search";
import { StatusBar } from "./components/status-bar";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      {/* TODO home tour */}
      <div className="flex flex-1 items-center justify-center overflow-auto">
        <div className="container m-auto max-w-2xl px-4 py-12">
          <div>
            <AppHeader />
          </div>
          <div className="mb-8 grid grid-cols-3 gap-3">
            <NewDocument />
            <NewResource />
            <Search />
          </div>
          <RecentFiles />
        </div>
      </div>
      <StatusBar />
    </div>
  );
}
