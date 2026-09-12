'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export type WorkCategory = 'All' | 'Websites' | 'E-commerce' | 'Platforms' | 'Other'
export type WorkSortOption = 'Featured' | 'Latest' | 'Alphabetical'

const CATEGORIES: WorkCategory[] = [
  'All',
  'Websites',
  'E-commerce',
  'Platforms',
  'Other',
]

const SORT_OPTIONS: WorkSortOption[] = ['Featured', 'Latest', 'Alphabetical']

interface WorkFilterBarProps {
  onCategoryChange?: (category: WorkCategory) => void
  onSortChange?: (sort: WorkSortOption) => void
}

export default function WorkFilterBar({
  onCategoryChange,
  onSortChange,
}: WorkFilterBarProps) {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All')
  const [activeSort, setActiveSort] = useState<WorkSortOption>('Featured')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  const handleCategoryClick = (cat: WorkCategory) => {
    setActiveCategory(cat)
    if (onCategoryChange) {
      onCategoryChange(cat)
    }
  }

  const handleSortSelect = (sort: WorkSortOption) => {
    setActiveSort(sort)
    setIsSortOpen(false)
    if (onSortChange) {
      onSortChange(sort)
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section className="w-full bg-[#FAF7F2] pt-6 sm:pt-10 pb-3 sm:pb-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1700px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          {/* Left: Category Pill Filter Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`cursor-pointer shrink-0 rounded-full px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:text-neutral-950 border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-black/[0.16] hover:bg-neutral-50/80'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          {/* Right: Sort By Dropdown */}
          <div className="relative shrink-0 self-end sm:self-auto" ref={sortDropdownRef}>
            <div className="flex items-center gap-1.5 select-none">
              <span className="text-[13px] sm:text-sm text-neutral-500 font-normal">
                Sort by
              </span>
              <button
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                className="cursor-pointer inline-flex items-center gap-1 text-[13px] sm:text-sm font-semibold text-[#8C5D38] hover:text-[#744926] transition-colors focus:outline-none"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span>{activeSort}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSortOpen ? 'rotate-180 text-[#744926]' : 'text-[#8C5D38]'
                  }`}
                />
              </button>
            </div>

            {/* Dropdown Menu */}
            {isSortOpen && (
              <div
                role="listbox"
                className="absolute right-0 mt-2 w-36 bg-white border border-black/[0.08] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSortSelect(option)}
                    className={`cursor-pointer w-full text-left px-3.5 py-1.5 text-xs sm:text-sm transition-colors ${
                      activeSort === option
                        ? 'bg-neutral-100 text-neutral-950 font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 font-normal'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
