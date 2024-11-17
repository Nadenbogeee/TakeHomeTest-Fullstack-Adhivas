import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const ModalAddCourse = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newCourse, setNewCourse] = useState({ title: "", description: "", lecturer_name: "", credits: 1, semester: "", department: "" });

  //   POST add course
  const handleCreateCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No Token Found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const courseData = {
        title: newCourse.title,
        description: newCourse.description,
        lecturer_name: newCourse.lecturer_name,
        credits: newCourse.credits,
        semester: newCourse.semester,
        department: newCourse.department,
      };

      const response = await axios.post("http://localhost:3000/api/courses", courseData, { headers });

      if (response.status === 201) {
        toast.success("Course sucessfully added");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button onPress={onOpen} color="warning" className="text-white font-bold">
        Tambah Mata Kuliah
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Input label="Matakuliah" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                <Input label="Deskripsi matakuliah" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
                <Input label="Nama Dosen" value={newCourse.lecturer_name} onChange={(e) => setNewCourse({ ...newCourse, lecturer_name: e.target.value })} />
                <Input label="Jumlah SKS" value={newCourse.credits} onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })} />
                <Input label="Semester e.g Ganjil/Genap" value={newCourse.semester} onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })} />
                <Input label="Department" value={newCourse.department} onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleCreateCourse}>
                  Tambah
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddCourse;
