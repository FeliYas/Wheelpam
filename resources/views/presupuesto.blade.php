<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
</head>

<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
    <table style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
        <tr>
            <td>
                <h2 style="color: #ef3620;">Nueva solicitud de presupuesto</h2>

                <p><strong>Nombre:</strong> {{ $datos['nombre'] }}</p>
                <p><strong>Email:</strong> {{ $datos['email'] }}</p>
                <p><strong>Teléfono:</strong> {{ $datos['telefono'] }}</p>
                <p><strong>Razón social:</strong> {{ $datos['razon'] }}</p>

                <hr>

                <p><strong>Rubro principal:</strong> {{ $datos['rubro'] ?? '---' }}</p>
                <p><strong>Provincia:</strong> {{ $datos['provincia'] ?? '---' }}</p>
                <p><strong>Localidad:</strong> {{ $datos['localidad'] ?? '---' }}</p>

                <p><strong>Aclaraciones:</strong></p>
                <p>{{ $datos['aclaraciones'] ?? '---' }}</p>

                <p style="margin-top: 20px; font-size: 12px; color: #888;">Se adjuntaron archivos si los hubiera.</p>
            </td>
        </tr>
    </table>
</body>

</html>