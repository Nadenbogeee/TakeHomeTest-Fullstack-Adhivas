import { useEffect, useState } from "react";
import MateriPemro from "../../assets/MateriPemro.jpg";
import { Button, CardFooter, Divider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import ModalAddCourse from "../ModalAddCourse";
import MataKuliah from "../../assets/mataKuliah.jpg";
import ModalEditCourse from "../ModalEditCourse";

const MainContent = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fungsi untuk membuka modal edit
  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  // Fungsi untuk update course
  const handleUpdateCourse = async (courseId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:3000/api/courses/${courseId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Update local state
        const updatedCourses = courses.map((course) => (course.id === courseId ? response.data.course : course));
        setCourses(updatedCourses);
        setIsEditModalOpen(false);
        // Optional: Show success message
        alert("Mata kuliah berhasil diperbarui!");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Gagal memperbarui mata kuliah. Silakan coba lagi.");
    }
  };

  // Fungsi untuk delete course
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:3000/api/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Update local state
          const updatedCourses = courses.filter((course) => course.id !== courseId);
          setCourses(updatedCourses);
          alert("Mata kuliah berhasil dihapus!");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Gagal menghapus mata kuliah. Silakan coba lagi.");
      }
    }
  };

  const studentData = [
    {
      rank: 1,
      name: "Yoga Naden",
      class: "PEMROGRAMAN",
      module: "L1",
      points: "1,234 Point",
    },
    {
      rank: 2,
      name: "Adhivas",
      class: "PEMROGRAMAN",
      module: "L1",
      points: "1,000 Point",
    },
    {
      rank: 3,
      name: "Michelle emerald",
      class: "PEMROGRAMAN",
      module: "L1",
      points: "800 Point",
    },
    {
      rank: 4,
      name: "Denys naidu",
      class: "PEMROGRAMAN",
      module: "L1",
      points: "500 Point",
    },
    // Add more student data here
  ];

  useEffect(() => {
    const FetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }

        const response = await axios.get("http://localhost:3000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCourses(response.data.data || response.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    FetchCourseDetails();
  }, [courses]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="mb-2 uppercase tracking-wide text-sm font-semibold">PEMOGRAMAN</div>
        <h1 className="text-3xl font-bold mb-4">Pemrograman Frontend Modern dengan React dan Angular</h1>
        <p className="mb-6 text-purple-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>Pemateri By Josep</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
              <span>14-06-2025</span>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold">MULAI LEARNING</button>
        </div>
      </div>

      {/* Modules Section */}
      <h2 className="text-xl font-bold mb-6">MODUL KOMPETENSI</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* blue-900 red-300 yellow-300 */}
          <div
            className="h-48 bg-cover bg-center flex items-center text-white justify-center font-bold text-[20px]"
            style={{
              backgroundImage: `url(${MateriPemro})`,
            }}
          >
            PEMROGRAMMAN
          </div>
          <div className="p-6">
            <h3 className="text-medium font-bold text-gray-600 mb-2">MATERI KOMPETENSI</h3>
            <ul className="space-y-2">
              <li className="text-[12px] text-gray-700 font-medium gap-2 flex flex-col">
                <p className="hover:bg-yellow-300">Pemrograman Frontend Modern dengan React dan Angular</p>
                <Divider />
                <p className="hover:bg-yellow-300">Pengembangan API Berstandar Industri dengan GraphQL dan REST</p>
                <Divider />
                <p className="hover:bg-yellow-300">Menerapkan Clean Code dan Design Pattern dalam Pengembangan Software</p>
                <Divider />
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* blue-900 red-300 yellow-300 */}
          <div className="h-48 bg-red-300 flex items-center justify-center font-bold text-[20px]">CREATIVE MARKETING</div>
          <div className="p-6">
            <h3 className="text-medium font-bold text-gray-600 mb-2">MATERI KOMPETENSI</h3>
            <ul className="space-y-2">
              <li className="text-[12px] text-gray-700 font-medium gap-2 flex flex-col ">
                <p className="hover:bg-yellow-300">Stroytelling dalam Pemasaran Mengubah Data Menjadi Cerita Yang Menginspirasi</p>
                <Divider />
                <p className="hover:bg-yellow-300">Pemasaran Viral Bagaimana Menciptakan Konten Yang Cepat Menyebar</p>
                <Divider />
                <p className="hover:bg-yellow-300">Memaksimalkan User-Generated Content dalam Strategi Pemasaran Kreatif</p>
                <Divider />
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* blue-900 red-300 yellow-300 */}
          <div className="h-48 bg-yellow-300 flex items-center justify-center font-bold text-[20px]">MANAGEMENT SDM</div>
          <div className="p-6">
            <h3 className="text-medium font-bold text-gray-600 mb-2">MATERI KOMPETENSI</h3>
            <ul className="space-y-2">
              <li className="text-[12px] text-gray-700 font-medium gap-2 flex flex-col">
                <p className="hover:bg-yellow-300">Stroytelling dalam Pemasaran Mengubah Data Menjadi Cerita Yang Menginspirasi</p>
                <Divider />
                <p className="hover:bg-yellow-300">Pemasaran Viral Bagaimana Menciptakan Konten Yang Cepat Menyebar</p>
                <Divider />
                <p className="hover:bg-yellow-300">Memaksimalkan User-Generated Content dalam Strategi Pemasaran Kreatif</p>
                <Divider />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}

      {/* Student Scores Section */}
      <h2 className="text-xl font-bold mb-6">NILAI PESERTA</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MODUL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {studentData.map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.rank}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.class}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.module}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-600">{student.points}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-evenly h-screen gap-4 items-center flex-wrap">
        {courses.map((course) => (
          <Card className="py-4 h-96 w-60" key={course.id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center ">
              <Image alt="Card background" className="object-cover rounded-xl w-[100%]" src={MataKuliah} />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className=" uppercase font-bold">Mata Kuliah: {course.title}</p>
              <small className="text-default-500">{course.description}</small>
              <small className="text-default-500">Jumlah SKS: {course.credits}</small>
              <small className="text-default-500">Nama dosen: {course.lecturer_name}</small>
              <small className="text-default-500">Semester: {course.semester}</small>
              <small className="text-default-500">Department: {course.department}</small>
            </CardBody>
            <CardFooter className="flex justify-center items-center gap-4">
              <Button className="w-32" onClick={() => handleEditClick(course)}>
                Edit
              </Button>
              <Button className="w-32" color="danger" onClick={() => handleDeleteCourse(course.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
        <ModalAddCourse />
      </div>
      <ModalEditCourse
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
        onUpdate={handleUpdateCourse}
      />
    </div>
  );
};

export default MainContent;
