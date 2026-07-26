import { lazy } from "react";
import type { ComponentType } from "react";

export type RoomControl = {
  id: string;
  label: string;
  icon: string;
};

export type RoomConfig = {
  id: string;
  name: string;
  icon: string;
  controls: RoomControl[];
};

export const roomConfigs: Record<string, RoomConfig> = {
  "living-room": {
    id: "living-room",
    name: "Living Room",
    icon: "couch",
    controls: [
      { id: "ctrl-1", label: "Main Light", icon: "lightbulb" },
      { id: "ctrl-2", label: "Ceiling Fan", icon: "fan" },
      { id: "ctrl-3", label: "Ambient Strip", icon: "lightbulb" },
      { id: "ctrl-4", label: "Air Conditioner", icon: "snowflake" },
      { id: "ctrl-5", label: "Reading Lamp", icon: "lightbulb" },
      { id: "ctrl-6", label: "Air Purifier", icon: "wind" },
      { id: "ctrl-7", label: "Smart TV", icon: "tv" },
      { id: "ctrl-8", label: "Room Heater", icon: "fire-flame-curved" },
    ],
  },
  bedroom: {
    id: "bedroom",
    name: "Bedroom",
    icon: "bed",
    controls: [
      { id: "ctrl-1", label: "Bedside Light", icon: "lightbulb" },
      { id: "ctrl-2", label: "Night Fan", icon: "fan" },
      { id: "ctrl-3", label: "Closet Light", icon: "lightbulb" },
      { id: "ctrl-4", label: "AC Unit", icon: "snowflake" },
      { id: "ctrl-5", label: "Desk Lamp", icon: "lightbulb" },
      { id: "ctrl-6", label: "Humidifier", icon: "droplet" },
      { id: "ctrl-7", label: "Bedroom TV", icon: "tv" },
      { id: "ctrl-8", label: "Heating Pad", icon: "fire-flame-curved" },
    ],
  },
  kitchen: {
    id: "kitchen",
    name: "Kitchen",
    icon: "utensils",
    controls: [
      { id: "ctrl-1", label: "Spotlights", icon: "lightbulb" },
      { id: "ctrl-2", label: "Exhaust Fan", icon: "fan" },
      { id: "ctrl-3", label: "Cabinet LED", icon: "lightbulb" },
      { id: "ctrl-4", label: "Fridge Boost", icon: "snowflake" },
      { id: "ctrl-5", label: "Counter Lamp", icon: "lightbulb" },
      { id: "ctrl-6", label: "Range Hood", icon: "wind" },
      { id: "ctrl-7", label: "Dishwasher", icon: "soap" },
      { id: "ctrl-8", label: "Oven Outlet", icon: "fire-flame-curved" },
    ],
  },
  bathroom: {
    id: "bathroom",
    name: "Bathroom",
    icon: "shower",
    controls: [
      { id: "ctrl-1", label: "Main Light", icon: "lightbulb" },
      { id: "ctrl-2", label: "Exhaust Fan", icon: "fan" },
      { id: "ctrl-3", label: "Mirror LED", icon: "lightbulb" },
      { id: "ctrl-4", label: "Water Heater", icon: "shower" },
      { id: "ctrl-5", label: "Towel Warmer", icon: "fire-flame-curved" },
      { id: "ctrl-6", label: "Floor Heat", icon: "temperature-arrow-up" },
      { id: "ctrl-7", label: "Dehumidifier", icon: "droplet-slash" },
      { id: "ctrl-8", label: "Night Light", icon: "moon" },
    ],
  },
  garage: {
    id: "garage",
    name: "Garage",
    icon: "warehouse",
    controls: [
      { id: "ctrl-1", label: "Bay Light", icon: "lightbulb" },
      { id: "ctrl-2", label: "Venting Fan", icon: "fan" },
      { id: "ctrl-3", label: "Bench Lamp", icon: "lightbulb" },
      { id: "ctrl-4", label: "EV Charger", icon: "bolt" },
      { id: "ctrl-5", label: "Door Lamp", icon: "lightbulb" },
      { id: "ctrl-6", label: "Floodlight", icon: "sun" },
      { id: "ctrl-7", label: "Power Rack", icon: "plug" },
      { id: "ctrl-8", label: "Compressor", icon: "gears" },
    ],
  },
  garden: {
    id: "garden",
    name: "Garden",
    icon: "tree",
    controls: [
      { id: "ctrl-1", label: "Path Lights", icon: "lightbulb" },
      { id: "ctrl-2", label: "Sprinklers", icon: "water" },
      { id: "ctrl-3", label: "Patio Lights", icon: "lightbulb" },
      { id: "ctrl-4", label: "Misting Fan", icon: "fan" },
      { id: "ctrl-5", label: "Pool Light", icon: "lightbulb" },
      { id: "ctrl-6", label: "Solar Accent", icon: "sun" },
      { id: "ctrl-7", label: "Gate Flood", icon: "shield" },
      { id: "ctrl-8", label: "Bug Zapper", icon: "bolt" },
    ],
  },
};

export type PageProps = {
  connected: boolean;
  onToggleConnection: () => void;
  sensorOnline: boolean;
  onToggleSensor: () => void;
  selectedRoom: string;
  onSelectRoom: (roomId: string) => void;
  changePage: (page: string) => void;
  goBack: () => void;
};

export type PageComponent = ComponentType<PageProps>;

export const pages: Record<string, React.LazyExoticComponent<PageComponent>> = {
  page0: lazy(() => import("./page0")),
  page1: lazy(() => import("./page1")),
  page2: lazy(() => import("./page2")),
};

export const pageNames = Object.keys(pages);
