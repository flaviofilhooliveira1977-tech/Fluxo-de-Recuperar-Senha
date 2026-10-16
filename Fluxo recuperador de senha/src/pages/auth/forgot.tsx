import z from "zod";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../components/button";
import { BackgroundIntro } from "../../components/backgroundIntro";
import { Input } from "../../components/input";
import goBack from "../../assets/goback.svg";

const forgotForm = z.object({
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
});

type ForgotForm = z.infer<typeof forgotForm>;

export function Forgot() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotForm),
    mode: "onChange",
  });

  function goBackPage() {
    navigate(-1);
  }

  async function handleSendEmail(data: ForgotForm) {
    try {
      // Simulação da chamada de API (substituir por api.post('/forgot-password', data))
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(data);
      navigate("/forgot/send-email");
    } catch {
      toast.error("E-mail não cadastrado ou erro ao enviar.");
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-5 antialiased">
      <div className="flex flex-col bg-background h-full items-center justify-center col-span-2">
        <div className="relative w-[352px] mt-[-200px]">
          <button
            type="button"
            className="absolute left-0 cursor-pointer mt-[-200px]"
            onClick={goBackPage}
          >
            <img
              src={goBack}
              alt="Seta para voltar para página de login"
              className="w-8 h-12"
            />
          </button>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-3xl font-poppins-semibold text-text-title">
            Eita, esqueceu
            <br />
            sua senha?
          </h1>
          <h3 className="font-poppins-regular text-base text-text-base">
            Não esquenta, vamos dar um jeito nisso.
          </h3>

          <form onSubmit={handleSubmit(handleSendEmail)}>
            <Input
              type="email"
              id="email"
              placeholder="E-mail"
              rounded="all"
              register={register}
              error={errors.email}
            />
            <Button
              type="submit"
              text={isSubmitting ? "Enviando..." : "Enviar"}
              disabled={isSubmitting || !isValid}
            />
          </form>
        </div>
      </div>
      <BackgroundIntro />
    </div>
  );
}