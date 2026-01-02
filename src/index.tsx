import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./screens/HomePage";
import { DropsPage } from "./screens/DropsPage";
import { CreateDrop } from "./screens/CreateDrop";
import { FansPage } from "./screens/FansPage";
import { PromotionPage } from "./screens/PromotionPage";
import { ManageDropPage } from "./screens/ManageDropPage";
import { ManageCampaignPage } from "./screens/ManageCampaignPage";
import { MessagesPage } from "./screens/MessagesPage";
import { AIAgentPage } from "./screens/AIAgentPage";
import { SettingsPage } from "./screens/SettingsPage";
import { FansDropPage } from "./screens/FansDropPage";
import { LinkEditorPage } from "./screens/LinkEditorPage";
import { OnboardingPage } from "./screens/OnboardingPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drops" element={<DropsPage />} />
        <Route path="/create-drop" element={<CreateDrop />} />
        <Route path="/fans" element={<FansPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/manage-drop/:id" element={<ManageDropPage />} />
        <Route path="/drop/:id" element={<FansDropPage />} />
        <Route path="/campaign/:id" element={<ManageCampaignPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/ai-agent" element={<AIAgentPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/link-editor/:id" element={<LinkEditorPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
