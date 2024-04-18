import { Image, User } from "@prisma/client"
import { CardPerfil } from "../components/Card"
import { Main } from "../components/Main"
import { useRouter } from "next/router"
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import { useEffect, useState } from "react";
import { HttpMethod } from "../../types";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import { Button, Heading, Stack } from "@chakra-ui/react";
import CloudinaryUploadWidget from "../components/Cloudinary";
import BlurImage from "../components/BlurImage";
import { ButtonImg } from "@/components/Button";


interface SettingsData
  extends Pick<
    User,
    | "id"
    | "name"
    | "image"
    | "email"
    | "password"
  > { }


interface FotoData {
  url: string;
}


export default function Perfil() {
  const router = useRouter()
  const { id } = router.query
  const userId = id;

  const { data: settings } = useSWR<User | null>(
    `/api/user?userId=qwdq`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingSite, setDeletingSite] = useState(false);

  const [data, setData] = useState<SettingsData>({
    id: "",
    name: "",
    email: null,
    password: null,
    image: null

  })



  useEffect(() => {
    if (settings) setData(settings)
  }, [settings])

  async function saveSiteSettings() {
    setSaving(true)
    try {
      const response = await fetch("/api/user?userId=qwdq", {
        method: HttpMethod.PUT,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 'qwdq',
          name: data.name,
          image: data.image,
          password: data.password,
          email: data.email
        }),
      });

      if (response.ok) {
        setSaving(false);
        mutate(`/api/user?userId=qwdq`);
        toast.success(`As alterações foram salvas`);
      }
    } catch (error) {
      toast.error("Failed to save settings");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }


  return (
    <Main title2={"Painel Administrativo de users"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
      <CardPerfil name1={"name"} name2={"email"} name3={"password"}
        onInput1={(e: any) =>
          setData((data) => ({
            ...data,
            name: (e.target as HTMLTextAreaElement).value,
          }))
        }
        onInput2={(e: any) =>
          setData((data) => ({
            ...data,
            email: (e.target as HTMLTextAreaElement).value,
          }))
        }
        onInput3={(e: any) =>
          setData((data) => ({
            ...data,
            password: (e.target as HTMLTextAreaElement).value,
          }))
        }
        value1={data.name || ""}
        value2={data.email || ""}
        value3={data.password || ""}
        onClick={async () => {
          await saveSiteSettings();
        }}
        type="submit"
      >
        <Stack
          spacing={4}
        >
          <Heading
            color={"#525F7F"}
            fontWeight={700}
            fontSize={"16px"}
          >
            Adicionar Foto de Perfil
          </Heading>

          <CloudinaryUploadWidget
            callback={(e) =>
              setData({
                ...data,
                image: e.secure_url,
              })
            }
          >
            {({ open }) => (
              <Button
                as="button"
                mt={""}
                w={"95%"}
                bg={"#296CB3"}
                borderRadius={"8px"}
                color={"#fff"}
                fontSize={"16px"}
                _hover={{
                  bg: "#296CB3"
                }}
                onClick={open}

              >
                Adicionar Imagem
              </Button>
            )}
          </CloudinaryUploadWidget>
        </Stack>
      </CardPerfil>


    </Main>
  )
}
