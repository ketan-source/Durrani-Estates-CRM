import { ProjectCatalogue, ProjectDetail } from "@/components/shared";
import { AddProjectScreen } from "../admin/screens";
import { useAdminNav } from "../admin/useAdminNav";
import PageFrame from "../admin/PageFrame";
import { PROJECTS } from "@/data";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/kit";

export default function ProjectsPropertiesPage({ mode = "list" }) {
  const { go } = useAdminNav();
  const { projectId } = useParams();
  const toast = useToast();

  if (mode === "add") {
    return (
      <PageFrame>
        <AddProjectScreen
          onCancel={() => go("projects")}
          onSave={(name) => {
            toast(`Project added: ${name || "Untitled project"}`);
            go("projects");
          }}
        />
      </PageFrame>
    );
  }

  if (mode === "detail") {
    const pr = PROJECTS.find((x) => x.id === projectId) || PROJECTS[0];
    return (
      <PageFrame>
        <ProjectDetail project={pr} admin />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <ProjectCatalogue
        title="Projects & Properties"
        sub="Manage project catalogue, units, pricing and availability"
        onOpen={(x) => go("project", x.id)}
        cta="Manage units"
        onCta={(x) => go("project", x.id)}
        action={
          <Button onClick={() => go("add-project")}>
            <Plus />
            Add Project
          </Button>
        }
      />
    </PageFrame>
  );
}
