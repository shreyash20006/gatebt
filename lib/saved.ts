'use client';

import { useState, useEffect } from 'react';

export interface SavedItem {
  id: string;
  type: 'note' | 'mindmap' | 'pyq' | 'resource' | 'paper';
  title: string;
  category?: string;
  href: string;
  downloadUrl?: string;
  savedAt: string;
}

const STORAGE_KEY = 'gatebt_saved_items';
const SAVED_EVENT = 'gatebt_saved_changed';

export function getSavedItems(): SavedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read saved items', e);
    return [];
  }
}

export function isItemSaved(id: string): boolean {
  const items = getSavedItems();
  return items.some((item) => item.id === id);
}

export function toggleSaveItem(item: SavedItem): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const items = getSavedItems();
    const index = items.findIndex((i) => i.id === item.id);
    let updated: SavedItem[];
    let nowSaved = false;

    if (index >= 0) {
      updated = items.filter((i) => i.id !== item.id);
      nowSaved = false;
    } else {
      updated = [item, ...items];
      nowSaved = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(SAVED_EVENT));
    return nowSaved;
  } catch (e) {
    console.error('Failed to toggle save item', e);
    return false;
  }
}

export function useSavedItems() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    setSavedItems(getSavedItems());

    const handleStorageChange = () => {
      setSavedItems(getSavedItems());
    };

    window.addEventListener(SAVED_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(SAVED_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return savedItems;
}
