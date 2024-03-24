"use client"

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import {isEmpty} from 'lodash'

const defaultErrorState = {
    title: '',
    imageA: '',
    imageB: ''
}
export default function CreatePage() {

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const [imageA, setImageA] = useState('')
    const [imageB, setImageB] = useState('')
    const createThumbnail = useMutation(api.thumbnails.createThumbnail);
    const url = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageA}`

    const [errors, setErrors] = useState(defaultErrorState)
    const {toast} = useToast()

    console.log(url, "image test a ")


    return (
        <div className="mt-16">
            <h1 className="text-4xl font-bold mb-8">Create a Blog Post</h1>
            <p className="text-lg max-w-md mb-6">start a your new journey with us</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const title = formData.get("title") as string;
                    setErrors(() => defaultErrorState)
                    if(!title){
                        setErrors((currentErrors) => ({
                            ...currentErrors ?? {},
                            title: "Please fill in this required field",
                        }))
                    }

                    if(!imageA){
                        setErrors((currentErrors) => ({
                            ...currentErrors ?? {},
                            imageA: "Please fill in this required field",
                        }))
                    }

                    if(!imageB){
                        setErrors((currentErrors) => ({
                            ...currentErrors ?? {},
                            imageB: "Please fill in this required field",
                        }))
                    }

                    if(!isEmpty(errors)){
                        toast({
                            title: "Form Errors",
                            description: "Please fill in all fields on the page.",
                            variant: "destructive"
                          })
                        return ;
                    }

                    createThumbnail({
                        aImage: imageA,
                        bImage: imageB,
                        title,
                    })

                }}
            >
                <div className="flex flex-col gap-4 mb-8">
                    <Label htmlFor="title">Your Test Label</Label>
                    <Input name="title" className={clsx( {
                        "border border-red-500" : errors.title
                    })} id="title" type="text" placeholder="Label  your test to make it easier to maange later." />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className={clsx("flex  flex-col gap-4 rounded p-2", {
                        "border border-red-500" : errors.imageA
                    })}>
                        <h2 className="text-2xl font-bold">Test Image A</h2>

                        {imageA && (
                            <Image
                                width="200"
                                height="200"
                                alt="text image a"
                                src={getImageUrl(imageA)}
                            />
                        )}

                        <UploadButton
                            uploadUrl={generateUploadUrl}
                            fileTypes={["image/*"]}
                            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                                setImageA((uploaded[0].response as any).storageId)
                            }}
                            onUploadError={(error: unknown) => {
                                // Do something with the error.
                                alert(`ERROR! ${error}`);
                            }}
                        />
                        {errors.imageA && <div className="text-red-500">{errors.imageA}</div>}
                    </div>
                    <div className={clsx("flex  flex-col gap-4 rounded p-2", {
                        "border border-red-500" : errors.imageB
                    })}>
                        <h2 className="text-2xl font-bold">Test Image B</h2>
                        {imageB && (
                            <Image
                                width={200}
                                height={200}
                                alt="text image B"
                                src={getImageUrl(imageB)}
                            />
                        )}
                        <UploadButton
                            uploadUrl={generateUploadUrl}
                            fileTypes={["image/*"]}
                            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                                setImageB((uploaded[0].response as any).storageId)
                            }}
                            onUploadError={(error: unknown) => {
                                // Do something with the error.
                                alert(`ERROR! ${error}`);
                            }}
                        />
                        {errors.imageA && <div className="text-red-500">{errors.imageA}</div>}
                    </div>
                </div>

                <Button>Create Thumbnail</Button>
            </form>
        </div>
    )
}