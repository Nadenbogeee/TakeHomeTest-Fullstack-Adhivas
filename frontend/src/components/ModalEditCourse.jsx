import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";

const ModalEditCourse = ({ isOpen, onClose, course, onUpdate }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    lecturer_name: "",
    credits: "",
    semester: "",
    department: "",
  });

  React.useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        lecturer_name: course.lecturer_name || "",
        credits: course.credits || "",
        semester: course.semester || "",
        department: course.department || "",
      });
    }
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(course.id, formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Edit Mata Kuliah</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input label="Judul Mata Kuliah" name="title" value={formData.title} onChange={handleChange} required />
              <Textarea label="Deskripsi" name="description" value={formData.description} onChange={handleChange} />
              <Input label="Nama Dosen" name="lecturer_name" value={formData.lecturer_name} onChange={handleChange} required />
              <Input label="Jumlah SKS" name="credits" type="number" value={formData.credits} onChange={handleChange} required />
              <Input label="Semester" name="semester" value={formData.semester} onChange={handleChange} />
              <Input label="Jurusan" name="department" value={formData.department} onChange={handleChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Batal
            </Button>
            <Button color="primary" type="submit">
              Simpan
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditCourse;
