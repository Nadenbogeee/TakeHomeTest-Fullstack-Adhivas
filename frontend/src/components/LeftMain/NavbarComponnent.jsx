import { Image, Input, Card } from "@nextui-org/react";
import LogoAdhivas from "../../assets/LogoAdhivas.png";
import { SearchIcon } from "../SearchIcon";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const NavbarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fungsi untuk mencari courses
  const searchCourses = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter courses berdasarkan query
      const filteredCourses = response.data.filter(
        (course) => course.title.toLowerCase().includes(query.toLowerCase()) || course.description?.toLowerCase().includes(query.toLowerCase()) || course.lecturer_name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredCourses);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  // Debounce function untuk mengurangi request ke server
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  // Gunakan debounce untuk searchCourses
  const debouncedSearch = debounce(searchCourses, 300);

  // Handle input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
    setShowDropdown(true);
  };

  // Handle click outside dropdown untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex h-28 justify-evenly items-center gap-4">
        <Image src={LogoAdhivas} height={40} />
        <p className="font-poppins font-bold text-xl">LEARNING MANAGEMENT SYSTEM</p>
        <div className="relative" ref={dropdownRef}>
          <Input className="rounded-2xl w-[300px]" variant="bordered" startContent={<SearchIcon size={18} />} type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />

          {/* Dropdown hasil pencarian */}
          {showDropdown && searchResults.length > 0 && (
            <Card className="absolute mt-1 w-full max-h-[300px] overflow-y-auto z-50">
              <div className="p-2">
                {searchResults.map((course) => (
                  <div
                    key={course.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => {
                      // Handle click pada hasil pencarian
                      // Misalnya scroll ke card course yang dipilih
                      const element = document.getElementById(`course-${course.id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                      setShowDropdown(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-gray-600">{course.lecturer_name}</div>
                    {course.description && <div className="text-xs text-gray-500 truncate">{course.description}</div>}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      </nav>
    </>
  );
};

export default NavbarComponent;
