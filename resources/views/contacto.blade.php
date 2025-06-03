<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Consulta desde el sitio web</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 30px;">

    <table width="100%"
        style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
        <tr>
            <td>
                <h2 style="color: #ef3620; margin-bottom: 20px;">Consulta recibida desde el sitio web</h2>

                <p style="margin-bottom: 10px;"><strong>Nombre y Apellido:</strong> {{ $datos['name'] }}</p>
                <p style="margin-bottom: 10px;"><strong>Email:</strong> {{ $datos['email'] }}</p>
                <p style="margin-bottom: 10px;"><strong>Celular:</strong> {{ $datos['celular'] }}</p>
                <p style="margin-bottom: 10px;"><strong>Empresa:</strong> {{ $datos['empresa'] }}</p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

                <p style="margin-bottom: 10px;"><strong>Mensaje:</strong></p>
                <p style="background-color: #f1f1f1; padding: 15px; border-radius: 5px;">{{ $datos['mensaje'] }}</p>

                <p style="font-size: 12px; color: #888; margin-top: 30px;">Este correo fue enviado desde el formulario
                    de contacto del sitio web.</p>
            </td>
        </tr>
    </table>

</body>

</html>