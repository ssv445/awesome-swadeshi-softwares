"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getCategoryDisplayName, getAppUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
import { searchApps } from "@/lib/search"
import type { SearchResult } from "@/lib/search"
import { SEARCH_MIN_LENGTH, SEARCH_MAX_RESULTS } from "@/lib/constants"
import type { Software } from "@/lib/data"

interface SearchBoxProps {
  allSoftware: Software[]
  placeholder?: string
  size?: "sm" | "md" | "lg"
  className?: string
  showHelpText?: boolean
}

export function SearchBox({
  allSoftware,
  placeholder = "Type International/Indian app name or Purpose of app...",
  size = "lg",
  className = "",
  showHelpText = true
}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Software[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  // Handle search input changes
  const handleSearchInputChange = useCallback(async (value: string) => {
    setSearchTerm(value)
    setSelectedIndex(-1)

    if (value.length >= SEARCH_MIN_LENGTH) {
      try {
        // Use the advanced search function
        const searchResults = await searchApps(value, {
          limit: SEARCH_MAX_RESULTS
        })

        // Extract the software entries from search results
        const results = searchResults.map(result => result.entry).map(entry => {
          // Find the full software object from allSoftware
          return allSoftware.find(software =>
            software.name === entry.name &&
            software.company === entry.company
          )
        }).filter(Boolean) as Software[]

        setSearchResults(results)
        setShowDropdown(true)
      } catch (error) {
        console.error('Search error:', error)
        // Fallback to simple search
        const results = allSoftware.filter(software =>
          software.name.toLowerCase().includes(value.toLowerCase()) ||
          software.alternatives.some(alt => alt.toLowerCase().includes(value.toLowerCase()))
        )
        setSearchResults(results.slice(0, SEARCH_MAX_RESULTS))
        setShowDropdown(true)
      }
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }, [allSoftware])

  // Handle selecting an app from dropdown
  const handleAppSelect = useCallback((software: Software) => {
    router.push(getAppUrl(software.category, software.slug))
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

  // Size variants - responsive for mobile (removed icon, so reduced left padding)
  const sizeClasses = {
    sm: "px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base",
    md: "px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg",
    lg: "px-4 sm:px-6 md:px-8 py-3 sm:py-5 md:py-8 text-base sm:text-xl md:text-3xl"
  }

  return (
    <div className={`relative z-50 ${className}`}>
      <Input
        ref={searchRef}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSearchBlur}
        onFocus={handleSearchFocus}
        className={`${sizeClasses[size]} border border-gray-300 rounded-lg bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-sm font-normal placeholder:text-gray-400`}
        autoComplete="off"
      />

      {/* Search Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-96 overflow-y-auto">
          <div className="p-2">
            <p className="text-sm text-gray-600 px-4 py-2 font-medium">
              {searchResults.length} Indian {searchResults.length === 1 ? 'app' : 'apps'} found
            </p>
            {searchResults.slice(0, SEARCH_MAX_RESULTS).map((app, index) => (
              <button
                key={index}
                onClick={() => handleAppSelect(app)}
                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left ${
                  index === selectedIndex ? 'bg-gray-100' : ''
                }`}
              >
                <Favicon
                  websiteUrl={app.website}
                  name={app.name}
                  size={24}
                  className="h-6 w-6 object-contain"
                  fallbackClassName="h-5 w-5 text-gray-600"
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

      {/* Help Text with Quick Search Suggestions */}
      {showHelpText && !searchTerm && (
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            💡 Try searching: {[
              { label: "Google Maps", type: "alternative" },
              { label: "WhatsApp", type: "alternative" },
              { label: "Stripe", type: "alternative" },
              { label: "CRM", type: "use-case" },
              { label: "messaging", type: "use-case" },
              { label: "Mappls", type: "app" },
              { label: "Arattai", type: "app" }
            ].map((suggestion, index, arr) => (
              <span key={suggestion.label}>
                <button
                  onClick={() => handleSearchInputChange(suggestion.label)}
                  className="text-gray-600 hover:text-gray-900 hover:underline font-medium cursor-pointer"
                >
                  {suggestion.label}
                </button>
                {index < arr.length - 1 && <span className="text-gray-400">, </span>}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}