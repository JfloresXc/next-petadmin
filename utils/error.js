import { setMessageError } from "utils/alerts";

export const handleError = (responseInJson) => {
  const { message = "Error de conexion dentro del catch", isError } =
    responseInJson;

  if (isError) setMessageError({ message });

  return {
    isError,
  };
};
