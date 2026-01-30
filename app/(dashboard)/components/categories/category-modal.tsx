import Button from "@/app/(landing)/components/ui/button"
import Modal from "../ui/modal"
import ImageUploadPreview from "../ui/image-upload-preview"
import { useEffect, useState } from "react"
import { Category } from "@/app/types"
import { getImageUrl } from "@/app/lib/api"
import { createCategory, updateCategory } from "@/app/services/category.service"
import { toast } from "react-toastify"

type TCategoryModalProps = {
    isOpen: boolean
    category?: Category | null
    onSuccess: () => void
    onClose: () => void
}

type CategoryFormData = {
    name: string
    description: string
}

const CategoryModal = ({isOpen, category, onSuccess, onClose}: TCategoryModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditMode = !!category

    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        description: ""
    })

    useEffect(() => {
        if (isEditMode && isOpen) {
            setFormData({
                name: category.name,
                description: category.description
            })
            setImagePreview(category.imageUrl ? getImageUrl(category.imageUrl) : null)
        } else if (isOpen) {
            setFormData({
                name:"",
                description:""
            })
            setImageFile(null)
            setImagePreview(null)
        }
    }, [category, isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target
        setFormData((prev) => ({...prev, [id]:value}))
        console.log(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setIsSubmitting(true)
        try {
            const data = new FormData()
            data.append("name", formData.name)
            data.append("description", formData.description)
            if (imageFile) {
                data.append("image", imageFile)
            }

            if (isEditMode) {
                await updateCategory(category._id, data)
            } else {
                await createCategory(data)
            }

            toast.success(isEditMode ? "Category updated successfully!": "Create created successfully!")
            setFormData({
                name:"",
                description:""
            })
            setImageFile(null)
            setImagePreview(null)

            onSuccess?.()
            onClose?.()
        } catch (error) {
            console.error(isEditMode ? "Failed to update category" : "Failed to create category", error)
            toast.error(isEditMode ? "Failed to update category" : "Failed to create category")
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category" : "Add New Category"}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex gap-7">
                    <div className="min-w-50">
                        <ImageUploadPreview label="Category Image" value={imagePreview} onChange={
                            (file) => {
                                setImageFile(file)
                                setImagePreview(URL.createObjectURL(file))
                            }}/>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="name">Category Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e. g. Running Shoes" />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={7} placeholder="category Details..."></textarea>
                        </div>
                    </div>
                </div>
                <Button className="ml-auto mt-3 rounded-lg" disabled={isSubmitting} onClick={handleSubmit}>{isEditMode ? "Update Category" : "Create Category"}</Button>
            </form>
        </Modal>
    )
}

export default CategoryModal