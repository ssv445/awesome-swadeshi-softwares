"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { getCategoryDisplayName, getAppUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
import { SEARCH_MIN_LENGTH, SEARCH_MAX_RESULTS } from "@/lib/constants"
import type { Software } from "@/lib/data"

interface SearchBoxProps {
  allSoftware: Software[]
  placeholder?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SearchBox({
  allSoftware,
  placeholder = "Search for Indian apps...",
  size = "lg",
  className = ""
}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Software[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  // Handle search input changes
  const handleSearchInputChange = useCallback((value: string) => {
    setSearchTerm(value)
    setSelectedIndex(-1)

    if (value.length >= SEARCH_MIN_LENGTH) {
      const results = allSoftware.filter(software =>
        software.name.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(results)
      setShowDropdown(true)
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }, [allSoftware])

  // Handle selecting an app from dropdown
  const handleAppSelect = useCallback((software: Software) => {
    router.push(getAppUrl(software.category, software.name))
    setSearchTerm("")
    setShowDropdown(false)
    setSelectedIndex(-1)
  }, [router])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || searchResults.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < Math.min(searchResults.length, SEARCH_MAX_RESULTS) - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleAppSelect(searchResults[selectedIndex])
        }
        break
      case "Escape":
        setShowDropdown(false)
        setSelectedIndex(-1)
        searchRef.current?.blur()
        break
    }
  }, [showDropdown, searchResults, selectedIndex, handleAppSelect])

  // Handle clicking outside to close dropdown
  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowDropdown(false)
      setSelectedIndex(-1)
    }, 200)
  }, [])

  // Handle focus to show dropdown again if there are results
  const handleSearchFocus = useCallback(() => {
    if (searchTerm.length >= SEARCH_MIN_LENGTH && searchResults.length > 0) {
      setShowDropdown(true)
    }
  }, [searchTerm, searchResults])

  // Size variants
  const sizeClasses = {
    sm: "pl-12 pr-4 py-3 text-base",
    md: "pl-16 pr-6 py-4 text-lg",
    lg: "pl-20 pr-8 py-8 text-3xl"
  }

  const iconSizeClasses = {
    sm: "left-4 h-5 w-5",
    md: "left-6 h-6 w-6",
    lg: "left-8 h-10 w-10"
  }

  return (
    <div className={`relative ${className}`}>
      <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 ${iconSizeClasses[size]}`} />
      <Input
        ref={searchRef}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSearchBlur}
        onFocus={handleSearchFocus}
        className={`${sizeClasses[size]} border-4 border-blue-400 rounded-2xl bg-white focus:border-blue-600 focus:ring-blue-600 shadow-2xl font-medium`}
        autoComplete="off"
      />

      {/* Search Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <p className="text-sm text-gray-600 px-4 py-2 font-medium">
              {searchResults.length} apps found
            </p>
            {searchResults.slice(0, SEARCH_MAX_RESULTS).map((app, index) => (
              <button
                key={index}
                onClick={() => handleAppSelect(app)}
                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left ${
                  index === selectedIndex ? 'bg-blue-50 border border-blue-200' : ''
                }`}
              >
                <Favicon
                  websiteUrl={app.website}
                  name={app.name}
                  size={24}
                  className="h-6 w-6 object-contain"
                  fallbackClassName="h-5 w-5 text-blue-600"
                  customFaviconUrl={app.faviconUrl}
                  fixedHeight={true}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{app.name}</p>
                  <p className="text-sm text-gray-600 truncate">{app.company}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {getCategoryDisplayName(app.category)}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}