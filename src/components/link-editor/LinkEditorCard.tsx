import React from "react";
import { Switch } from "../ui/switch";

export interface EditableLinkData {
  id: string;
  title: string;
  url: string;
  isEnabled: boolean;
  clicks: number;
  hasWarning?: boolean;
  warningMessage?: string;
}

interface LinkEditorCardProps {
  link: EditableLinkData;
  onToggle?: (id: string, enabled: boolean) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onOpenLink?: (url: string) => void;
}

export function LinkEditorCard({
  link,
  onToggle,
  onDelete,
  onEdit,
  onOpenLink,
}: LinkEditorCardProps) {
  return (
    <div
      className={`bg-brand-gray-400 border border-brand-gray-200/50 rounded-2xl ${
        !link.isEnabled ? "opacity-60" : ""
      }`}
    >
      <div className="p-5 flex items-start space-x-4">
        <button className="text-brand-gray-100 mt-2 cursor-grab active:cursor-grabbing">
          <i className="fa-solid fa-grip-vertical"></i>
          <i className="fa-solid fa-grip-vertical -ml-2"></i>
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white">{link.title}</h3>
              <button
                onClick={() => onEdit?.(link.id)}
                className="text-brand-gray-100 hover:text-white"
              >
                <i className="fa-solid fa-pen text-xs"></i>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onOpenLink?.(link.url)}
                className="text-brand-gray-100 hover:text-white"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
              </button>
              <Switch
                checked={link.isEnabled}
                onCheckedChange={(checked) => onToggle?.(link.id, checked)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-sm text-brand-gray-100">
              {link.url || "URL"}
            </p>
            <button
              onClick={() => onEdit?.(link.id)}
              className="text-brand-gray-100 hover:text-white"
            >
              <i className="fa-solid fa-pen text-xs"></i>
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-brand-gray-100">
              <button className="hover:text-white">
                <i className="fa-solid fa-image"></i>
              </button>
              <button className="hover:text-white">
                <i className="fa-solid fa-star"></i>
              </button>
              <button className="hover:text-white">
                <i className="fa-solid fa-calendar-days"></i>
              </button>
              <button className="hover:text-white">
                <i className="fa-solid fa-lock"></i>
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <i className="fa-solid fa-chart-simple"></i>
                <span>{link.clicks} clicks</span>
              </div>
            </div>
            <button
              onClick={() => onDelete?.(link.id)}
              className="text-brand-gray-100 hover:text-red-400"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
      {link.hasWarning && link.warningMessage && (
        <div className="bg-purple-900/20 border-t border-purple-500/30 px-5 py-3 text-sm text-purple-200 flex items-center">
          <i className="fa-solid fa-circle-info mr-3"></i>
          <span dangerouslySetInnerHTML={{ __html: link.warningMessage }}></span>
        </div>
      )}
    </div>
  );
}
