import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  DollarSignIcon,
  GlobeIcon,
  PlusCircleIcon,
  Share2Icon,
  UploadIcon,
  UsersIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Header } from "../../components/layout/Header";

const DEFAULT_BG_COLOR = "#521614";
const DEFAULT_ACCENT_COLOR = "#ffffff40";

interface ExtractedColors {
  bgColor: string;
  accentColor: string;
}

const extractColors = (imageSrc: string): Promise<ExtractedColors> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ bgColor: DEFAULT_BG_COLOR, accentColor: DEFAULT_ACCENT_COLOR });
        return;
      }

      const sampleSize = 50;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const data = imageData.data;

      const colorCounts: Record<string, { count: number; r: number; g: number; b: number }> = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const brightness = (r + g + b) / 3;
        if (brightness < 30 || brightness > 225) continue;

        const quantR = Math.round(r / 32) * 32;
        const quantG = Math.round(g / 32) * 32;
        const quantB = Math.round(b / 32) * 32;

        const key = `${quantR},${quantG},${quantB}`;
        if (!colorCounts[key]) {
          colorCounts[key] = { count: 0, r: quantR, g: quantG, b: quantB };
        }
        colorCounts[key].count++;
      }

      let dominantColor = { r: 82, g: 22, b: 20 };
      let maxCount = 0;

      Object.values(colorCounts).forEach((color) => {
        if (color.count > maxCount) {
          maxCount = color.count;
          dominantColor = { r: color.r, g: color.g, b: color.b };
        }
      });

      const darkenFactor = 0.4;
      const darkR = Math.round(dominantColor.r * darkenFactor);
      const darkG = Math.round(dominantColor.g * darkenFactor);
      const darkB = Math.round(dominantColor.b * darkenFactor);

      const bgHex = `#${darkR.toString(16).padStart(2, "0")}${darkG.toString(16).padStart(2, "0")}${darkB.toString(16).padStart(2, "0")}`;
      const accentHex = `#${dominantColor.r.toString(16).padStart(2, "0")}${dominantColor.g.toString(16).padStart(2, "0")}${dominantColor.b.toString(16).padStart(2, "0")}`;

      resolve({ bgColor: bgHex, accentColor: accentHex });
    };

    img.onerror = () => resolve({ bgColor: DEFAULT_BG_COLOR, accentColor: DEFAULT_ACCENT_COLOR });
    img.src = imageSrc;
  });
};

const dropOptions = [
  {
    icon: DollarSignIcon,
    label: "Ticket Price",
    value: "Free",
    hasToggle: true,
    toggleState: false,
  },
  {
    icon: Share2Icon,
    label: "Social Account",
    subtitle: "Collect fan social account",
    hasToggle: true,
    toggleState: true,
  },
  {
    icon: UsersIcon,
    label: "RSVP Spots",
    value: "Unlimited",
    hasToggle: true,
    toggleState: false,
  },
];

interface MobilePreviewProps {
  dropName: string;
  shortSummary: string;
  dropDate: Date | null;
  dropTime: string;
  flyerImage: string | null;
}

const formatCountdown = (dropDate: Date | null, dropTime: string): string => {
  if (!dropDate) return "2D 4H";

  const [hours, minutes] = dropTime.split(':').map(Number);
  const targetDate = new Date(dropDate);
  targetDate.setHours(hours || 15, minutes || 0, 0, 0);

  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return "NOW";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days}D ${remainingHours}H`;
  }
  return `${remainingHours}H`;
};

const MobilePreview = ({ dropName, shortSummary, dropDate, dropTime, flyerImage }: MobilePreviewProps) => {
  const countdown = useMemo(() => formatCountdown(dropDate, dropTime), [dropDate, dropTime]);

  const displayName = dropName || "My Drop Name";
  const displaySummary = shortSummary || "Unlock exclusive access to the upcoming virtual concert and receive a limited edition 3...";

  const nameParts = displayName.length > 20
    ? [displayName.slice(0, 20), displayName.slice(20, 40)]
    : [displayName];

  return (
    <div className="relative w-[280px] h-[560px] bg-black rounded-[40px] p-2 shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
      <div className="w-full h-full bg-[#0a1a0a] rounded-[32px] overflow-hidden flex flex-col">
        <div className="flex justify-end p-3">
          <div className="flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-white text-[10px] font-medium">LIVE IN {countdown}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-4">
          {flyerImage ? (
            <div className="w-40 h-48 relative rounded-lg overflow-hidden">
              <img src={flyerImage} alt="Flyer" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-40 h-48 relative">
              <svg viewBox="0 0 160 200" className="w-full h-full">
                <defs>
                  <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00ffaa" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00ffaa" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="dropGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#00ffaa" />
                    <stop offset="100%" stopColor="#004433" />
                  </linearGradient>
                </defs>
                <ellipse cx="80" cy="120" rx="70" ry="50" fill="url(#glowGradient)" />
                <path
                  d="M80 20 Q80 20 80 20 C40 80 30 120 30 140 C30 175 52 195 80 195 C108 195 130 175 130 140 C130 120 120 80 80 20 Z"
                  fill="none"
                  stroke="url(#dropGradient)"
                  strokeWidth="3"
                />
                <path
                  d="M80 50 Q80 50 80 50 C55 95 50 120 50 135 C50 160 63 175 80 175 C97 175 110 160 110 135 C110 120 105 95 80 50 Z"
                  fill="none"
                  stroke="#00aa77"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="px-4 pb-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
            <span className="text-white/70 text-xs">@creator</span>
          </div>

          <div>
            {nameParts.map((part, idx) => (
              <h3 key={idx} className="text-white font-semibold text-lg leading-tight">{part}</h3>
            ))}
          </div>

          <p className="text-white/60 text-xs leading-relaxed line-clamp-3">
            {displaySummary}
          </p>

          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
              <div className="w-4 h-4 bg-white/20 rounded" />
            </div>
            <div className="flex-1">
              <div className="text-white/50 text-[10px] uppercase tracking-wider">Wallet Pass</div>
              <div className="text-white text-sm font-medium">Genesis Ticket</div>
            </div>
            <ChevronRightIcon className="w-4 h-4 text-white/40" />
          </div>

          <button className="w-full bg-white text-black rounded-xl py-3 flex items-center justify-center gap-2 font-medium text-sm">
            <WalletIcon className="w-4 h-4" />
            Add to Wallet
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
    </div>
  );
};

export const CreateDrop = (): JSX.Element => {
  const [dropName, setDropName] = useState("My Drop Name");
  const [shortSummary, setShortSummary] = useState("");
  const [showSummaryInput, setShowSummaryInput] = useState(false);
  const [dropDate, setDropDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  });
  const [dropTime, setDropTime] = useState("15:00");
  const [flyerImage, setFlyerImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (flyerImage) {
      extractColors(flyerImage).then((colors) => {
        setBgColor(colors.bgColor);
        setAccentColor(colors.accentColor);
      });
    } else {
      setBgColor(DEFAULT_BG_COLOR);
      setAccentColor(DEFAULT_ACCENT_COLOR);
    }
  }, [flyerImage]);

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return "Select date";
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setDropDate(new Date(value + 'T00:00:00'));
    }
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFlyerImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleRemoveImage = useCallback(() => {
    setFlyerImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="min-h-screen w-full transition-colors duration-500" style={{ backgroundColor: bgColor }}>
      <Header />
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-5 lg:gap-16 px-4 py-4 lg:py-8">
        <div className="flex-1 max-w-md mx-auto lg:mx-0 lg:max-w-xl flex flex-col gap-5">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-1.5 bg-[#ffffff14] rounded-full px-2.5 py-1.5">
              <div
                className="w-5 h-5 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0"
                style={{ backgroundImage: "url(/image-1.png)" }}
              />
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffa3] text-xs">
                Mayan Warrior
              </span>
              <ChevronDownIcon className="w-3 h-3 text-[#ffffffa3]" />
            </div>

            <div className="flex items-center gap-1.5 bg-[#ffffff14] rounded-full px-2.5 py-1.5">
              <GlobeIcon className="w-4 h-4 text-[#ffffffa3]" />
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffa3] text-xs">
                Public
              </span>
              <ChevronDownIcon className="w-3 h-3 text-[#ffffffa3]" />
            </div>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full aspect-square rounded-2xl overflow-hidden lg:hidden relative cursor-pointer ${
              isDragging ? 'ring-2 ring-white/60' : ''
            }`}
          >
            {flyerImage ? (
              <>
                <img
                  className="w-full h-full object-cover"
                  alt="Event cover"
                  src={flyerImage}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <XIcon className="w-4 h-4 text-white" />
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-[#ffffff14] flex flex-col items-center justify-center gap-3">
                <UploadIcon className="w-10 h-10 text-white/50" />
                <p className="text-white/60 text-sm">Tap to upload flyer</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-[#ffffff14] rounded-xl px-2 py-1.5 w-fit mx-auto lg:hidden">
            <div
              className="w-8 h-6 rounded bg-cover bg-center bg-no-repeat flex-shrink-0"
              style={{ backgroundImage: "url(/image.png)" }}
            />
            <div className="flex flex-col">
              <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff80] text-[9px] leading-3">
                Theme
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-xs leading-4">
                Minimal
              </div>
            </div>
            <ChevronsUpDownIcon className="w-3.5 h-3.5 text-[#ffffff80] flex-shrink-0" />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <div className="bg-[#ffffff14] rounded-[30px] px-4 lg:px-5 py-3 lg:py-4">
              <input
                type="text"
                value={dropName}
                onChange={(e) => setDropName(e.target.value)}
                placeholder="Enter drop name"
                className="w-full bg-transparent border-none outline-none [font-family:'Inter',Helvetica] font-normal text-[#cccccce6] text-[26px] lg:text-[32px] leading-8 lg:leading-9 placeholder:text-[#ffffff40]"
              />
            </div>

            {showSummaryInput ? (
              <div className="bg-[#ffffff14] rounded-2xl px-4 py-3">
                <textarea
                  value={shortSummary}
                  onChange={(e) => setShortSummary(e.target.value)}
                  placeholder="Add a short summary for your drop..."
                  className="w-full bg-transparent border-none outline-none resize-none [font-family:'Inter',Helvetica] font-normal text-[#cccccce6] text-sm leading-5 placeholder:text-[#ffffff40] min-h-[80px]"
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowSummaryInput(true)}
                className="flex items-center gap-1.5 bg-[#ffffff14] rounded-full px-2.5 py-1.5 h-auto w-fit hover:bg-[#ffffff20]"
              >
                <PlusCircleIcon className="w-3.5 h-3.5 text-[#ffffffa3]" />
                <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffa3] text-xs">
                  Short Summary
                </span>
              </Button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
            {flyerImage ? (
              <div className="hidden lg:block relative w-full rounded-2xl overflow-hidden">
                <img src={flyerImage} alt="Flyer preview" className="w-full h-auto object-cover" />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <XIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`hidden lg:flex bg-[#ffffff14] rounded-2xl border-2 border-dashed flex-col items-center justify-center py-10 px-6 gap-3 cursor-pointer transition-colors ${
                  isDragging ? 'border-white/60 bg-[#ffffff20]' : 'border-white/20 hover:border-white/40 hover:bg-[#ffffff18]'
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <UploadIcon className="w-6 h-6 text-white/70" />
                </div>
                <div className="text-center">
                  <p className="[font-family:'Inter',Helvetica] font-medium text-white text-sm">
                    Upload Your Flyer
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-white/60 text-xs mt-1">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3.5">
              <h3 className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffc9] text-[11.9px]">
                Dates
              </h3>

              <div className="flex flex-col gap-2">
                <div className="bg-[#ffffff14] rounded-2xl p-0.5 overflow-hidden">
                  <div className="flex items-center gap-1 px-4 py-2">
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#ffffffc9] text-[13.6px] w-[70px] flex-shrink-0">
                      Drop Day
                    </span>
                    <div className="flex gap-0.5 flex-1 min-w-0">
                      <div className="flex-1 bg-[#ffffff14] rounded-l-lg px-3 py-1.5 relative">
                        <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base whitespace-nowrap">
                          {formatDateForDisplay(dropDate)}
                        </span>
                        <input
                          type="date"
                          value={formatDateForInput(dropDate)}
                          onChange={handleDateChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="bg-[#ffffff14] rounded-r-lg px-3 py-1.5 relative">
                        <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base">
                          {dropTime}
                        </span>
                        <input
                          type="time"
                          value={dropTime}
                          onChange={(e) => setDropTime(e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffc9] text-[11.9px] px-1">
                Drop Options
              </h3>

              <div className="bg-[#ffffff14] rounded-2xl overflow-hidden divide-y divide-white/10">
                {dropOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 px-4 py-3">
                      <Icon className="w-4 h-4 text-[#ffffffc9] flex-shrink-0" />
                      <div className="flex-1 flex flex-col gap-0.5">
                        <span className="[font-family:'Inter',Helvetica] font-normal text-[#ffffffc9] text-[13.6px]">
                          {option.label}
                        </span>
                        {option.subtitle && (
                          <span className="[font-family:'Inter',Helvetica] font-light text-[#ffffff80] text-[10px]">
                            {option.subtitle}
                          </span>
                        )}
                      </div>
                      {option.value && (
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff60] text-[13.6px]">
                          {option.value}
                        </span>
                      )}
                      {option.hasToggle && (
                        <Switch
                          defaultChecked={option.toggleState}
                          accentColor={accentColor}
                          className="data-[state=unchecked]:bg-[#ffffff20] flex-shrink-0"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Button className="w-full bg-white hover:bg-white/90 text-[#320000] rounded-2xl h-11 [font-family:'Inter',Helvetica] font-medium text-[15.3px]">
              Create Event
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 flex-col items-center pt-8 gap-6">
          <MobilePreview
            dropName={dropName}
            shortSummary={shortSummary}
            dropDate={dropDate}
            dropTime={dropTime}
            flyerImage={flyerImage}
          />
          <div className="flex items-center gap-2.5 bg-[#ffffff14] rounded-2xl px-3 py-2 w-[280px]">
            <div
              className="w-11 h-8 rounded-lg bg-cover bg-center bg-no-repeat flex-shrink-0"
              style={{ backgroundImage: "url(/image.png)" }}
            />
            <div className="flex flex-col flex-1 min-w-0">
              <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff80] text-[10px] leading-4">
                Theme
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-sm leading-5">
                Minimal
              </div>
            </div>
            <ChevronsUpDownIcon className="w-4 h-4 text-[#ffffff80] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
