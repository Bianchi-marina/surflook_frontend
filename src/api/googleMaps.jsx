const apiKey = import.meta.env.VITE_GOOGLEMAPS_API_KEY;

export const validateLocation = async (cidade, estado) => {
  if (!cidade || !estado) {
    console.error(
      "Cidade e Estado são obrigatórios para validar a localização."
    );
    return { isValid: false, errors: { cidade: true, estado: true } };
  }

  const address = `${cidade}, ${estado}, Brasil`;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Erro ao validar localização: ${response.status} - ${errorText}`
      );
      return { isValid: false, errors: { cidade: true, estado: true } };
    }

    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const components = data.results[0].address_components;

      const cityMatch =
        cidade &&
        components.some(
          (component) =>
            component.long_name?.toLowerCase() === cidade.toLowerCase()
        );
      const stateMatch =
        estado &&
        components.some(
          (component) =>
            component.short_name?.toLowerCase() === estado.toLowerCase()
        );

      return {
        isValid: cityMatch && stateMatch,
        errors: {
          cidade: !cityMatch,
          estado: !stateMatch,
        },
      };
    }

    return { isValid: false, errors: { cidade: true, estado: true } };
  } catch (error) {
    console.error("Erro ao validar localização:", error);
    return { isValid: false, errors: { cidade: true, estado: true } };
  }
};
