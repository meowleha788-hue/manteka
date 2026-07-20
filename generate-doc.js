import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  TabStopPosition,
  TabStopType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  Tab,
  convertInchesToTwip,
  LevelFormat,
  ImageRun,
} from "docx";
import fs from "fs";

const GREEN = "1B5E20";
const DARK_GREEN = "0D3B0F";
const LIGHT_GREEN = "E8F5E9";
const MID_GREEN = "2E7D32";
const WHITE = "FFFFFF";
const BLACK = "000000";
const GRAY = "F5F5F5";

function title(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 56, color: GREEN, font: "Calibri" })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  });
}

function subtitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 28, color: "666666", font: "Calibri", italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  });
}

function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 36, color: GREEN, font: "Calibri" })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN } },
  });
}

function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 30, color: MID_GREEN, font: "Calibri" })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
  });
}

function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: DARK_GREEN, font: "Calibri" })],
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: "Calibri", ...opts })],
    spacing: { after: 120, line: 276 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function pBold(text) {
  return p(text, { bold: true });
}

function code(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: "Consolas",
        size: 20,
        color: DARK_GREEN,
      }),
    ],
    spacing: { after: 80 },
    indent: { left: convertInchesToTwip(0.5) },
    shading: { type: ShadingType.SOLID, color: LIGHT_GREEN, fill: LIGHT_GREEN },
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: "Calibri" })],
    bullet: { level },
    spacing: { after: 60 },
  });
}

function bulletBold(label, text, level = 0) {
  return new Paragraph({
    children: [
      new TextRun({ text: label, bold: true, size: 22, font: "Calibri" }),
      new TextRun({ text, size: 22, font: "Calibri" }),
    ],
    bullet: { level },
    spacing: { after: 60 },
  });
}

function emptyLine() {
  return new Paragraph({ children: [], spacing: { after: 100 } });
}

function screenshotPlaceholder(label) {
  return new Paragraph({
    children: [
      new TextRun({
        text: `[INSERTAR CAPTURA DE PANTALLA: ${label}]`,
        size: 20,
        font: "Calibri",
        italics: true,
        color: "999999",
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.CENTER,
    border: {
      top: { style: BorderStyle.DASHED, size: 1, color: "CCCCCC" },
      bottom: { style: BorderStyle.DASHED, size: 1, color: "CCCCCC" },
      left: { style: BorderStyle.DASHED, size: 1, color: "CCCCCC" },
      right: { style: BorderStyle.DASHED, size: 1, color: "CCCCCC" },
    },
    indent: { left: convertInchesToTwip(0.5), right: convertInchesToTwip(0.5) },
  });
}

function tableInfo(headers, rows) {
  const headerRow = new TableRow({
    children: headers.map(
      (h) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: WHITE })],
              alignment: AlignmentType.CENTER,
            }),
          ],
          shading: { type: ShadingType.SOLID, color: GREEN, fill: GREEN },
          width: { size: Math.floor(9000 / headers.length), type: WidthType.DXA },
        })
    ),
    tableHeader: true,
  });

  const dataRows = rows.map(
    (row) =>
      new TableRow({
        children: row.map((cell, i) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: cell, size: 20, font: "Calibri" })],
                indent: { left: 80 },
              }),
            ],
            shading:
              rows.indexOf(row) % 2 === 0
                ? { type: ShadingType.SOLID, color: GRAY, fill: GRAY }
                : undefined,
            width: { size: Math.floor(9000 / headers.length), type: WidthType.DXA },
          })
        ),
      })
  );

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 9000, type: WidthType.DXA },
  });
}

// ========================
// COVER PAGE
// ========================
const coverPage = [
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  new Paragraph({
    children: [new TextRun({ text: "UNIVERSIDAD", size: 32, bold: true, font: "Calibri", color: GREEN })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "[Nombre de la Universidad]", size: 24, font: "Calibri", color: "666666" })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Facultad de Ingenieria en Sistemas", size: 24, font: "Calibri", color: "666666" })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  emptyLine(),
  emptyLine(),
  new Paragraph({
    children: [
      new TextRun({
        text: "Guia Practica: Desarrollo de Aplicaciones Web con Laravel",
        size: 44,
        bold: true,
        font: "Calibri",
        color: GREEN,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Proyecto: Sistema Manteka",
        size: 32,
        bold: true,
        font: "Calibri",
        color: MID_GREEN,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  new Paragraph({
    children: [
      new TextRun({ text: "Curso: ", size: 24, bold: true, font: "Calibri" }),
      new TextRun({ text: "Desarrollo de Software", size: 24, font: "Calibri" }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Profesor: ", size: 24, bold: true, font: "Calibri" }),
      new TextRun({ text: "[Nombre del Profesor]", size: 24, font: "Calibri" }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Alumno: ", size: 24, bold: true, font: "Calibri" }),
      new TextRun({ text: "Magnujuda", size: 24, font: "Calibri" }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Fecha: ", size: 24, bold: true, font: "Calibri" }),
      new TextRun({ text: "Julio 2026", size: 24, font: "Calibri" }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({ children: [], spacing: { after: 100 }, pageBreakBefore: true }),
];

// ========================
// TABLE OF CONTENTS
// ========================
const tocPage = [
  h1("Tabla de Contenidos"),
  emptyLine(),
  p("1. Introduccion a Laravel"),
  p("   1.1 Que es Laravel"),
  p("   1.2 Por que elegir Laravel"),
  p("2. Requisitos Previos e Instalacion"),
  p("   2.1 Requisitos del Sistema"),
  p("   2.2 Instalacion de PHP y Composer"),
  p("   2.3 Creacion del Proyecto"),
  p("   2.4 Configuracion del Proyecto"),
  p("3. Estructura del Proyecto Manteka"),
  p("   3.1 Arquitectura General"),
  p("   3.2 Tecnologias Utilizadas"),
  p("4. Desarrollo Paso a Paso"),
  p("   4.1 Modelos (Models)"),
  p("   4.2 Migraciones (Database)"),
  p("   4.3 Controladores (Controllers)"),
  p("   4.4 Form Requests (Validacion)"),
  p("   4.5 Rutas (Routes)"),
  p("   5. Frontend con Inertia y Vue"),
  p("   5.1 Que es Inertia.js"),
  p("   5.2 Paginas Vue"),
  p("   5.3 Componentes UI"),
  p("6. Autenticacion con Fortify"),
  p("   6.1 Configuracion de Fortify"),
  p("   6.2 Registro y Login"),
  p("7. Resultados y Capturas"),
  p("8. Conclusiones"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 1: INTRODUCTION
// ========================
const ch1 = [
  h1("1. Introduccion a Laravel"),

  h2("1.1 Que es Laravel"),
  p(
    "Laravel es un framework de codigo abierto para el desarrollo de aplicaciones web escrito en PHP. Fue creado por Taylor Otwell en 2011 con la intencion de proporcionar una alternativa mas elegante y estructurada al framework CodeIgniter."
  ),
  p(
    "En terminos simples, Laravel es como un conjunto de herramientas pre-construidas que nos facilitan la vida como desarrolladores. En vez de escribir todo desde cero (autenticacion, base de datos, seguridad, etc.), Laravel ya trae esas partes resueltas para que nosotros nos enfoquemos en lo importante: la logica de nuestro negocio."
  ),
  p("Algunas de las cosas que Laravel trae de fabrica son:"),
  bullet("Autenticacion de usuarios (login, registro, recuperar contrasena)"),
  bullet("Conexion y manejo de bases de datos"),
  bullet("Sistema de rutas para definir las URLs de nuestra aplicacion"),
  bullet("Validacion de formularios de forma sencilla"),
  bullet("Sistema de plantillas para el frontend"),
  bullet("Colas y tareas programadas"),
  bullet("Sistema de notificaciones por correo"),

  h2("1.2 Por que elegir Laravel"),
  p(
    "Laravel se ha convertido en uno de los frameworks de PHP mas populares del mundo, y no es por casualidad. Aqui van algunas razones:"
  ),
  bulletBold("Sintaxis elegante: ", "Laravel usa un codigo limpio y facil de leer. Si alguien lee tu codigo, entiende lo que hace sin necesidad de mil comentarios."),
  bulletBold("Documentacion oficial: ", "Tiene una de las mejores documentaciones que existen. Si algo no sabes, la documentacion te lo explica paso a paso."),
  bulletBold("Comunidad activa: ", "Hay miles de desarrolladores usando Laravel. Si te atascas, siempre hay alguien que ha tenido el mismo problema y lo resolvio."),
  bulletBold("Herramientas de desarrollo: ", "Laravel incluye herramientas como Artisan (un asistente de linea de comandos), Tinker (para probar codigo en tiempo real) y muchisimo mas."),
  bulletBold("Seguridad: ", "Laravel viene con protecciones contra los ataques mas comunes como SQL injection, cross-site scripting (XSS) y cross-site request forgery (CSRF)."),
  p(
    "Para este proyecto, elegimos Laravel porque nos permite crear aplicaciones web robustas, escalables y seguras de una forma rapida y organizada."
  ),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 2: INSTALLATION
// ========================
const ch2 = [
  h1("2. Requisitos Previos e Instalacion"),

  h2("2.1 Requisitos del Sistema"),
  p(
    "Antes de empezar a trabajar con Laravel, necesitamos tener algunas cosas instaladas en nuestra computadora. Piensa en esto como las herramientas necesarias antes de empezar a construir una casa."
  ),
  emptyLine(),
  tableInfo(
    ["Componente", "Version Requerida", "Para que sirve"],
    [
      ["PHP", "8.3 o superior", "El lenguaje de programacion en el que esta escrito Laravel"],
      ["Composer", "2.x", "El gestor de paquetes de PHP. Es como npm pero para PHP"],
      ["SQLite", "3.35+", "El sistema de base de datos que usamos (viene incluido con PHP)"],
      ["Node.js", "18+", "Necesario para compilar los archivos del frontend"],
      ["npm", "9+", "El gestor de paquetes de JavaScript"],
    ]
  ),
  emptyLine(),

  h2("2.2 Instalacion de PHP y Composer"),
  p("Primero, verificamos que PHP este instalado y en la version correcta:"),
  code("php --version"),
  p(
    "Si PHP no esta instalado o tienes una version anterior, puedes instalarlo desde la pagina oficial: https://php.net"
  ),
  p(
    "Luego, instalamos Composer. Composer es como el administrador de paquetes de PHP: con el我们可以 instalar librerias externas que Laravel necesita para funcionar."
  ),
  code("php -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\""),
  code("php composer-setup.php"),
  code("php -r \"unlink('composer-setup.php');\""),
  p(
    "En Windows, puedes descargar el instalador desde https://getcomposer.org y ejecutarlo directamente."
  ),
  screenshotPlaceholder("Terminal mostrando php --version y composer --version"),

  h2("2.3 Creacion del Proyecto"),
  p(
    "Para crear un nuevo proyecto en Laravel, usamos Composer. Este comando descarga todos los archivos base de Laravel y crea la estructura de carpetas de nuestro proyecto:"
  ),
  code('composer create-project laravel/laravel manteka'),
  p(
    "Este comando hace varias cosas automaticamente:"
  ),
  bullet("Crea una carpeta llamada 'manteka' con toda la estructura de Laravel"),
  bullet("Descarga todas las dependencias necesarias"),
  bullet("Genera un archivo .env con la configuracion base"),
  bullet("Crea una llave de encriptacion para la aplicacion"),
  p(
    "Despues de ejecutar este comando, entramos a la carpeta del proyecto:"
  ),
  code("cd manteka"),
  screenshotPlaceholder("Terminal mostrando la creacion del proyecto Laravel"),

  h2("2.4 Configuracion del Proyecto"),
  p(
    "El archivo .env es el archivo de configuracion principal. Aqui le dice a Laravel como conectarse a la base de datos, cual es la URL de la aplicacion, y otros datos importantes."
  ),
  p("En nuestro proyecto, configuramos la base de datos SQLite:"),
  code("DB_CONNECTION=sqlite"),
  code("DB_DATABASE=/home/magnujuda/Documentos/3inf/manteka/database/database.sqlite"),
  p(
    "SQLite es una base de datos que no necesita un servidor separado. Todo esta guardado en un solo archivo, lo cual es perfecto para proyectos de aprendizaje y desarrollo."
  ),
  p("Despues de configurar el .env, ejecutamos la migracion para crear las tablas en la base de datos:"),
  code("php artisan migrate"),
  p(
    "Luego, instalamos las dependencias de JavaScript que necesitamos para el frontend:"
  ),
  code("npm install"),
  code("npm run build"),
  p(
    "Para iniciar el servidor de desarrollo, usamos:"
  ),
  code("composer run dev"),
  p(
    "Esto levanta un servidor local en http://localhost:8000 donde podemos ver nuestra aplicacion funcionando."
  ),
  screenshotPlaceholder("Navegador mostrando la pagina de bienvenida de Laravel"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 3: PROJECT STRUCTURE
// ========================
const ch3 = [
  h1("3. Estructura del Proyecto Manteka"),

  h2("3.1 Arquitectura General"),
  p(
    "El proyecto Manteka es una aplicacion web para gestionar el servicio tecnico de computadores. Permite llevar un registro de los equipos que llegan a reparar, los clientes que los traen, y toda la informacion relevante del servicio."
  ),
  p(
    "Usamos una arquitectura que combina Laravel en el backend (la parte del servidor) con Vue.js en el frontend (la parte que ve el usuario), comunicados a traves de Inertia.js."
  ),
  p("En terminos simples:"),
  bulletBold("Backend (Laravel): ", "Se encarga de la logica del negocio, la base de datos, la seguridad y la comunicacion con el servidor."),
  bulletBold("Frontend (Vue.js): ", "Se encarga de lo que el usuario ve y con lo que interactua (botones, formularios, tablas, etc.)."),
  bulletBold("Inertia.js: ", "Es el puente que conecta Laravel con Vue. Permite usar componentes de Vue sin necesidad de crear una API REST separada."),

  h2("3.2 Tecnologias Utilizadas"),
  emptyLine(),
  tableInfo(
    ["Tecnologia", "Version", "Que es"],
    [
      ["PHP", "8.5", "Lenguaje de programacion del backend"],
      ["Laravel", "13.20.0", "Framework de PHP que estructura la aplicacion"],
      ["Inertia.js", "3.1.1", "Puente entre Laravel y Vue"],
      ["Vue.js", "3.5.40", "Framework de JavaScript para el frontend"],
      ["Tailwind CSS", "4.3.3", "Framework de estilos CSS"],
      ["Fortify", "1.37.2", "Sistema de autenticacion de Laravel"],
      ["Wayfinder", "0.1.20", "Genera funciones TypeScript para las rutas de Laravel"],
      ["SQLite", "-", "Base de datos ligera y portatil"],
      ["Pest", "4.7.5", "Framework de testing para PHP"],
    ]
  ),
  emptyLine(),
  screenshotPlaceholder("Estructura de carpetas del proyecto en VS Code"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 4: DEVELOPMENT
// ========================
const ch4 = [
  h1("4. Desarrollo Paso a Paso"),

  h2("4.1 Modelos (Models)"),
  p(
    "Un modelo en Laravel es una clase de PHP que representa una tabla de la base de datos. Piensa en un modelo como un molde: define que campos tiene una entidad y como se comporta."
  ),
  p(
    "Por ejemplo, si tenemos una tabla 'equipos' con columnas nombre, modelo, propietario, etc., el modelo Equipo nos permite interactuar con esa tabla de forma sencilla."
  ),
  p("En lugar de escribir SQL como:"),
  code('INSERT INTO equipos (nombre, modelo) VALUES ("PC Dell", "Optiplex 7090")'),
  p("Con el modelo podemos escribir:"),
  code('Equipo::create(["nombre" => "PC Dell", "modelo" => "Optiplex 7090"])'),
  p("Es mucho mas limpio y seguro, ademas de que Laravel se encarga de protegernos contra inyeccion SQL automaticamente."),
  emptyLine(),

  h3("Modelo: Equipo"),
  p("Archivo: app/Models/Equipo.php"),
  screenshotPlaceholder("Contenido del archivo Equipo.php"),
  p("Este modelo representa un equipo de computo que llega al servicio tecnico. Sus campos son:"),
  bulletBold("nombre: ", "El nombre o identificador del equipo"),
  bulletBold("modelo: ", "El modelo del equipo (ej: Dell Optiplex 7090)"),
  bulletBold("propietario: ", "El nombre del dueño del equipo"),
  bulletBold("f_ingreso: ", "La fecha en que el equipo ingreso al servicio"),
  bulletBold("f_entrega: ", "La fecha estimada de entrega"),
  bulletBold("problema: ", "Descripcion del problema que presenta el equipo"),
  p(
    "La linea 'protected $fillable' es muy importante: le dice a Laravel que campos se pueden modificar masivamente. Es una medida de seguridad para evitar que alguien modifique campos que no deberia."
  ),
  code('protected $fillable = ["nombre", "modelo", "propietario", "f_ingreso", "f_entrega", "problema"]'),
  emptyLine(),

  h3("Modelo: Cliente"),
  p("Archivo: app/Models/Cliente.php"),
  screenshotPlaceholder("Contenido del archivo Cliente.php"),
  p("Este modelo representa a los clientes del servicio tecnico. Sus campos son:"),
  bulletBold("nombre: ", "Nombre completo del cliente"),
  bulletBold("email: ", "Correo electronico (unico para cada cliente)"),
  bulletBold("telefono: ", "Numero de telefono de contacto"),
  bulletBold("direccion: ", "Direccion del cliente"),
  bulletBold("ciudad: ", "Ciudad donde vive"),
  bulletBold("MetodoPago: ", "Como prefiere pagar (efectivo, tarjeta, transferencia, etc.)"),
  p(
    "Nota: En este modelo usamos '$table = clientes_tables' porque el nombre de la tabla en la base de datos es diferente al nombre por defecto que Laravel busca."
  ),
  emptyLine(),

  h3("Crear un modelo nuevo con Artisan"),
  p("El comando para crear un modelo con Artisan es:"),
  code("php artisan make:model Equipo"),
  p(
    "Este comando crea un archivo vacio en app/Models/Equipo.php. Luego le agregas los campos y configuracion que necesites."
  ),
  p(
    "Si quieres crear el modelo junto con su migracion, controlador y factory (para tests), puedes usar:"
  ),
  code("php artisan make:model Equipo -mfrc"),
  p(
    "Donde -m crea la migracion, -f crea el factory, -r crea el controlador con metodos resource, y -c crea el seeder."
  ),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),

  h2("4.2 Migraciones (Database)"),
  p(
    "Una migracion es como un plano de construccion de una tabla en la base de datos. En lugar de crear las tablas manualmente con SQL, Laravel te permite definirlas con codigo PHP que puede ejecutarse, deshacerse y versionarse."
  ),
  p("La ventaja de las migraciones es que:"),
  bullet("Puedes deshacer cambios si algo sale mal (como un ctrl+Z de la base de datos)"),
  bullet("El equipo de desarrollo puede tener la misma estructura de base de datos"),
  bullet("Puedes versionar los cambios de la base de datos junto con el codigo"),
  bullet("Facilitan el trabajo en equipo"),
  emptyLine(),

  h3("Migracion de la tabla equipos"),
  p("Archivo: database/migrations/2026_07_20_010611_create_equipos_table.php"),
  screenshotPlaceholder("Contenido del archivo de migracion de equipos"),
  p("Los comandos importantes en esta migracion son:"),
  bulletBold("$table->id() ", "- Crea una columna 'id' autoincremental (la llave primaria)"),
  bulletBold("$table->string('nombre') ", "- Crea una columna de texto para el nombre"),
  bulletBold("$table->timestamps() ", "- Crea automaticamente las columnas 'created_at' y 'updated_at'"),
  p(
    "El metodo up() se ejecuta cuando aplicas la migracion, y el metodo down() se ejecuta cuando la deshaces."
  ),
  emptyLine(),

  h3("Migracion de la tabla clientes"),
  p("Archivo: database/migrations/2026_07_20_012155_create_clientes_table.php"),
  screenshotPlaceholder("Contenido del archivo de migracion de clientes"),
  p("Algunos detalles importantes de esta migracion:"),
  bulletBold("->unique() ", "- Garantiza que no haya dos clientes con el mismo email"),
  bulletBold("->nullable() ", "- Permite que el campo quede vacio (no es obligatorio)"),
  bulletBold("->string('nombre', 255) ", "- El 255 indica la longitud maxima del texto"),
  emptyLine(),

  h3("Comandos de migracion utiles"),
  p("Comandos que vas a usar frecuentemente:"),
  code("php artisan migrate                    # Aplica todas las migraciones pendientes"),
  code("php artisan migrate:fresh              # Borra todo y vuelve a crear las tablas"),
  code("php artisan migrate:rollback           # Deshace la ultima migracion"),
  code("php artisan migrate:status             # Muestra el estado de las migraciones"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),

  h2("4.3 Controladores (Controllers)"),
  p(
    "Un controlador es una clase de PHP que se encarga de recibir las peticiones HTTP (cuando un usuario visita una URL o envia un formulario) y devolver una respuesta. Es como el director de orquesta: recibe las instrucciones, decide que hacer y devuelve el resultado."
  ),
  p(
    "En Laravel, un controlador tipicamente tiene metodos que corresponden a las acciones que un usuario puede realizar:"
  ),
  emptyLine(),
  tableInfo(
    ["Metodo", "Que hace", "Ejemplo de URL"],
    [
      ["index()", "Muestra todos los registros", "GET /equipos"],
      ["create()", "Muestra el formulario de creacion", "GET /equipos/create"],
      ["store()", "Guarda un nuevo registro", "POST /equipos"],
      ["show()", "Muestra un solo registro", "GET /equipos/1"],
      ["edit()", "Muestra el formulario de edicion", "GET /equipos/1/edit"],
      ["update()", "Actualiza un registro existente", "PUT /equipos/1"],
      ["destroy()", "Elimina un registro", "DELETE /equipos/1"],
    ]
  ),
  emptyLine(),

  h3("Controlador: EquipoController"),
  p("Archivo: app/Http/Controllers/EquipoController.php"),
  screenshotPlaceholder("Contenido del archivo EquipoController.php"),
  p("Veamos que hace cada metodo:"),
  emptyLine(),
  pBold("Metodo index():"),
  p(
    "Este metodo muestra la lista de todos los equipos. Usa Inertia::render para renderizar el componente Vue 'Equipos/Index' y le pasa la lista de todos los equipos de la base de datos."
  ),
  code("public function index()"),
  code("    return Inertia::render('Equipos/Index', ["),
  code("        'equipos' => Equipo::all(),"),
  code("    ]);"),
  code("}"),
  p(
    "Equipo::all() es un metodo de Eloquent (el ORM de Laravel) que ejecuta 'SELECT * FROM equipos' y devuelve todos los registros como una coleccion."
  ),
  emptyLine(),
  pBold("Metodo store():"),
  p(
    "Este metodo recibe los datos del formulario de creacion, los valida y los guarda en la base de datos."
  ),
  code("public function store(StoreEquipoRequest $request)"),
  code("    Equipo::create($request->validated());"),
  code("    return redirect()->route('equipos.index');"),
  code("}"),
  p(
    "Fijate que usa StoreEquipoRequest en vez de Request comun. Esto es porque necesitamos validar los datos antes de guardarlos (ver la seccion de Form Requests)."
  ),
  p(
    "$request->validated() devuelve solo los datos que pasaron la validacion. Es una forma segura de obtener los datos."
  ),
  emptyLine(),
  pBold("Metodo destroy():"),
  p(
    "Este metodo elimina un equipo de la base de datos. Recibe el equipo como parametro porque Laravel usa Route Model Binding: automaticamente busca el equipo con el ID que viene en la URL."
  ),
  code("public function destroy(Equipo $equipo)"),
  code("    $equipo->delete();"),
  code("    return redirect()->route('equipos.index');"),
  code("}"),
  emptyLine(),

  h3("Controlador: ClienteController"),
  p("Archivo: app/Http/Controllers/ClienteController.php"),
  screenshotPlaceholder("Contenido del archivo ClienteController.php"),
  p(
    "Este controlador funciona igual que EquipoController pero para clientes. Tiene los mismos metodos (index, create, store, show, edit, update, destroy) pero trabajando con el modelo Cliente y las vistas de Clientes."
  ),
  p(
    "Es comun que cuando hagas CRUD (Crear, Leer, Actualizar, Eliminar) para varias entidades, los controladores tengan una estructura similar. La diferencia esta en que modelo y que vistas usan."
  ),
  emptyLine(),

  h3("Crear un controlador con Artisan"),
  code("php artisan make:controller EquipoController --resource"),
  p(
    "El flag --resource crea un controlador con todos los metodos CRUD pre-generados (index, create, store, show, edit, update, destroy). Te ahorra escribir toda la estructura basica."
  ),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),

  h2("4.4 Form Requests (Validacion)"),
  p(
    "Un Form Request en Laravel es una clase especializada en validar los datos que llegan de un formulario. En vez de meter toda la validacion en el controlador, la separamos en su propia clase para mantener el codigo limpio y organizado."
  ),
  p(
    "Piensa en un Form Request como un portero: revisa que los datos que llegan cumplan con los requisitos antes de dejarlos pasar. Si algo esta mal, rechaza la peticion y muestra errores al usuario."
  ),
  emptyLine(),

  h3("Form Request: StoreEquipoRequest"),
  p("Archivo: app/Http/Requests/StoreEquipoRequest.php"),
  screenshotPlaceholder("Contenido del archivo StoreEquipoRequest.php"),
  p("Las reglas de validacion que definimos son:"),
  emptyLine(),
  tableInfo(
    ["Campo", "Reglas", "Que significa"],
    [
      ["nombre", "required, string, max:255", "Obligatorio, texto, maximo 255 caracteres"],
      ["modelo", "required, string, max:255", "Obligatorio, texto, maximo 255 caracteres"],
      ["propietario", "required, string, max:255", "Obligatorio, texto, maximo 255 caracteres"],
      ["f_ingreso", "required, string, max:255", "Obligatorio, texto, maximo 255 caracteres"],
      ["f_entrega", "required, string, max:255", "Obligatorio, texto, maximo 255 caracteres"],
      ["problema", "required, string, max:255", "Obligatorio, texto, maximo 255 caracteres"],
    ]
  ),
  emptyLine(),

  h3("Form Request: StoreClienteRequest"),
  p("Archivo: app/Http/Requests/StoreClienteRequest.php"),
  screenshotPlaceholder("Contenido del archivo StoreClienteRequest.php"),
  p("Reglas de validacion para clientes:"),
  emptyLine(),
  tableInfo(
    ["Campo", "Reglas", "Que significa"],
    [
      ["nombre", "required, string, max:255", "Obligatorio"],
      ["email", "required, string, email, max:255", "Obligatorio y debe ser un email valido"],
      ["telefono", "required, string, max:255", "Obligatorio"],
      ["direccion", "required, string, max:255", "Obligatorio"],
      ["ciudad", "required, string, max:255", "Obligatorio"],
      ["MetodoPago", "required, string, max:255", "Obligatorio"],
    ]
  ),
  emptyLine(),
  p("Para crear un Form Request:"),
  code("php artisan make:request StoreEquipoRequest"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),

  h2("4.5 Rutas (Routes)"),
  p(
    "Las rutas son las URLs que existen en tu aplicacion. Cuando un usuario visita una URL, Laravel busca en el archivo de rutas cual controlador debe atender esa peticion."
  ),
  p(
    "Es como un mapa: le dice a Laravel que hacer cuando alguien visita cada pagina."
  ),
  emptyLine(),
  h3("Archivo de rutas: routes/web.php"),
  screenshotPlaceholder("Contenido del archivo routes/web.php"),
  p("Veamos que dice este archivo:"),
  emptyLine(),
  code("Route::inertia('/', 'Welcome')->name('home');"),
  p(
    "Esta linea dice que cuando alguien visite la pagina principal '/', se muestre el componente Vue Welcome."
  ),
  emptyLine(),
  code("Route::middleware(['auth', 'verified'])->group(function () {"),
  code("    Route::resource('equipos', EquipoController::class);"),
  code("    Route::resource('clientes', ClienteController::class);"),
  code("});"),
  p(
    "Aqui pasan dos cosas importantes:"
  ),
  bulletBold("middleware('auth', 'verified'): ", "Estas rutas estan protegidas. Solo los usuarios logueados y con el email verificado pueden acceder."),
  bulletBold("Route::resource(): ", "Este es un atajo magico. En una sola linea crea las 7 rutas CRUD (index, create, store, show, edit, update, destroy) para equipos y clientes. Sin esto, tendriamos que escribir 7 lineas por cada entidad."),
  emptyLine(),
  p("Rutas que se generan automaticamente con Route::resource:"),
  emptyLine(),
  tableInfo(
    ["Metodo HTTP", "URL", "Controlador", "Accion"],
    [
      ["GET", "/equipos", "EquipoController@index", "Listar todos"],
      ["GET", "/equipos/create", "EquipoController@create", "Formulario de creacion"],
      ["POST", "/equipos", "EquipoController@store", "Guardar nuevo"],
      ["GET", "/equipos/{equipo}", "EquipoController@show", "Ver uno"],
      ["GET", "/equipos/{equipo}/edit", "EquipoController@edit", "Formulario de edicion"],
      ["PUT/PATCH", "/equipos/{equipo}", "EquipoController@update", "Actualizar"],
      ["DELETE", "/equipos/{equipo}", "EquipoController@destroy", "Eliminar"],
    ]
  ),
  emptyLine(),
  p("Comandos utiles para rutas:"),
  code("php artisan route:list              # Muestra todas las rutas registradas"),
  code("php artisan route:list --method=GET  # Filtra solo las rutas GET"),
  code("php artisan route:list --name=equipos # Filtra por nombre"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 5: FRONTEND
// ========================
const ch5 = [
  h1("5. Frontend con Inertia y Vue"),

  h2("5.1 Que es Inertia.js"),
  p(
    "Inertia.js es un framework que conecta Laravel con frameworks de frontend como Vue, React o Svelte sin necesidad de crear una API REST. Es como un puente directo entre el servidor y el navegador."
  ),
  p("Sin Inertia, tipicamente harias:"),
  bullet("1. Crear una API REST en Laravel con rutas, controladores y respuestas JSON"),
  bullet("2. Crear un frontend separado que consuma esa API con fetch o axios"),
  bullet("3. Manejar la autenticacion, sesiones y CSRF manualmente"),
  p("Con Inertia:"),
  bullet("1. El controlador devuelve una vista Vue directamente"),
  bullet("2. Inertia se encarga de pasar los datos del servidor al componente Vue"),
  bullet("3. La autenticacion, sesiones y CSRF se manejan automaticamente"),
  p(
    "En resumen, Inertia te permite usar Laravel como si fuera un framework monolico tradicional pero con la experiencia de usuario de una aplicacion SPA (Single Page Application)."
  ),
  emptyLine(),

  h2("5.2 Configuracion de Inertia"),
  p("Para que Inertia funcione, necesitamos varios archivos configurados:"),
  emptyLine(),

  h3("Middleware: HandleInertiaRequests.php"),
  p("Archivo: app/Http/Middleware/HandleInertiaRequests.php"),
  screenshotPlaceholder("Contenido del archivo HandleInertiaRequests.php"),
  p(
    "Este middleware se encarga de compartir datos entre el servidor y el frontend. Por ejemplo, comparte los datos del usuario autenticado para que esten disponibles en todas las paginas Vue."
  ),
  p("Los datos que comparte son:"),
  bulletBold("name: ", "El nombre de la aplicacion"),
  bulletBold("auth.user: ", "Los datos del usuario actualmente logueado"),
  bulletBold("currentTeam: ", "El equipo actual del usuario"),
  bulletBold("teams: ", "Todos los equipos a los que pertenece el usuario"),
  emptyLine(),

  h3("Archivo de entrada: resources/js/app.ts"),
  screenshotPlaceholder("Contenido del archivo app.ts"),
  p(
    "Este es el punto de entrada de JavaScript. Crea la aplicacion Inertia y configura que layout (disposicion visual) usar para cada pagina."
  ),
  p("La configuracion de layouts dice:"),
  bullet("Si es la pagina Welcome, no usa ningun layout"),
  bullet("Si es una pagina de autenticacion (empieza con auth/), usa AuthLayout"),
  bullet("Si es de settings o teams, usa AppLayout + SettingsLayout"),
  bullet("Para todo lo demas, usa AppLayout"),
  emptyLine(),

  h3("Plantilla Blade: resources/views/app.blade.php"),
  p("Archivo: resources/views/app.blade.php"),
  screenshotPlaceholder("Contenido del archivo app.blade.php"),
  p(
    "Aunque usamos Vue, Laravel necesita un archivo Blade como punto de entrada HTML. Este archivo configura el HTML base, carga los estilos CSS y el JavaScript. Inertia se encarga de renderizar el componente Vue dentro de este HTML."
  ),
  emptyLine(),

  h2("5.3 Paginas Vue"),
  p(
    "Las paginas Vue son los componentes que el usuario ve. Cada pagina de Laravel esta representada por un archivo .vue en resources/js/pages."
  ),
  p("La estructura de carpetas es:"),
  code("resources/js/pages/"),
  code("  Equipos/"),
  code("    Index.vue       <- Lista de todos los equipos"),
  code("    Create.vue      <- Formulario para crear equipo"),
  code("    Edit.vue        <- Formulario para editar equipo"),
  code("    Show.vue        <- Detalle de un equipo"),
  code("  Clientes/"),
  code("    Index.vue       <- Lista de todos los clientes"),
  code("    Create.vue      <- Formulario para crear cliente"),
  code("    Edit.vue        <- Formulario para editar cliente"),
  code("    Show.vue        <- Detalle de un cliente"),
  code("  Dashboard.vue     <- Pagina principal del panel"),
  code("  Welcome.vue       <- Pagina de bienvenida"),
  emptyLine(),

  h3("Pagina: Equipos/Index.vue"),
  p("Archivo: resources/js/pages/Equipos/Index.vue"),
  screenshotPlaceholder("Captura de la pagina de listado de equipos"),
  p("Esta pagina muestra una tabla con todos los equipos. Los puntos clave son:"),
  emptyLine(),
  pBold("Recibiendo datos del servidor:"),
  code("defineProps<{ equipos: Equipo[] }>()"),
  p(
    "defineProps recibe los datos que el controlador paso con Inertia::render. En este caso, el array de equipos."
  ),
  emptyLine(),
  pBold("Renderizando la lista:"),
  code('<tr v-for="equipo in equipos" :key="equipo.id">'),
  p(
    "v-for es una directiva de Vue que itera sobre cada equipo y crea una fila de la tabla por cada uno."
  ),
  emptyLine(),
  pBold("Eliminando un registro:"),
  code("const deleteEquipo = (id: number) => {"),
  code('  if (confirm("Esta seguro de eliminar este equipo?")) {'),
  code("    router.delete(equiposRoutes.destroy(id));"),
  code("  }"),
  code("};"),
  p(
    "router.delete() de Inertia envia una peticion DELETE al servidor. La funcion confirm() muestra un dialogo de confirmacion antes de eliminar."
  ),
  emptyLine(),

  h3("Pagina: Equipos/Create.vue"),
  p("Archivo: resources/js/pages/Equipos/Create.vue"),
  screenshotPlaceholder("Captura del formulario de creacion de equipo"),
  p("Esta pagina tiene un formulario para crear un nuevo equipo. Los puntos clave son:"),
  emptyLine(),
  pBold("El componente Form de Inertia:"),
  code('<Form :action="equiposRoutes.store()" method="post" #default="{ errors, processing }">'),
  p(
    "El componente Form de Inertia se encarga de enviar los datos al servidor. 'action' es la URL donde se envia el formulario, method es el metodo HTTP."
  ),
  p(
    "errors contiene los errores de validacion que vienen del servidor. Si un campo no paso la validacion, el error se muestra debajo del campo."
  ),
  emptyLine(),
  pBold("Mostrando errores de validacion:"),
  code('<div v-if="errors.nombre" class="text-sm text-red-500">{{ errors.nombre }}</div>'),
  p(
    "Si hay un error para el campo 'nombre', se muestra un texto en rojo debajo del input."
  ),
  emptyLine(),

  h3("Pagina: Equipos/Edit.vue"),
  p("Archivo: resources/js/pages/Equipos/Edit.vue"),
  screenshotPlaceholder("Captura del formulario de edicion de equipo"),
  p("Esta pagina es similar a Create pero con los datos precargados:"),
  code('<Input id="nombre" name="nombre" v-model="equipo.nombre" />'),
  p(
    "La diferencia principal es v-model='equipo.nombre': esto liga el valor del input con la propiedad nombre del objeto equipo. Cuando se carga la pagina, el input ya tiene el valor actual del equipo."
  ),
  emptyLine(),

  h3("Paginas de Clientes"),
  p(
    "Las paginas de Clientes (Index.vue, Create.vue, Edit.vue) funcionan exactamente igual que las de Equipos pero con los campos de cliente (nombre, email, telefono, direccion, ciudad, MetodoPago)."
  ),
  screenshotPlaceholder("Captura de la pagina de listado de clientes"),
  emptyLine(),

  h2("5.4 Componentes UI"),
  p(
    "El proyecto usa componentes de interfaz de usuario pre-construidos que se encuentran en resources/js/components/ui/. Estos componentes son: "
  ),
  emptyLine(),
  tableInfo(
    ["Componente", "Que es", "Donde se usa"],
    [
      ["Button", "Boton con diferentes estilos", "Acciones como Guardar, Cancelar"],
      ["Input", "Campo de entrada de texto", "Formularios de creacion y edicion"],
      ["Label", "Etiqueta para campos", "Formularios de creacion y edicion"],
      ["Card", "Tarjeta contenedora", "Agrupar informacion"],
      ["Dialog", "Ventana modal", "Confirmaciones y formularios emergentes"],
      ["Badge", "Etiqueta pequena", "Mostrar estados o categorias"],
      ["Separator", "Linea separadora", "Dividir secciones"],
      ["Avatar", "Imagen de perfil", "Mostrar foto del usuario"],
      ["Breadcrumb", "Migas de pan", "Navegacion superior"],
      ["Select", "Menu desplegable", "Seleccionar opciones"],
      ["Sidebar", "Barra lateral", "Navegacion principal"],
    ]
  ),
  emptyLine(),
  p(
    "Estos componentes usan Tailwind CSS para los estilos y Reka UI para la accesibilidad y funcionalidad base."
  ),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 6: AUTH
// ========================
const ch6 = [
  h1("6. Autenticacion con Fortify"),

  h2("6.1 Que es Fortify"),
  p(
    "Laravel Fortify es un paquete que implementa toda la logica de autenticacion (login, registro, recuperar contrasena, verificacion de email, doble factor de autenticacion) de forma automatica. Nosotros solo necesitamos configurar que funcionalidades queremos y como queremos que se vean las vistas."
  ),
  p(
    "Es como tener un sistema de seguridad completo instalado: solo le dices que puertas quieres cerrar con llave y el se encarga del resto."
  ),
  emptyLine(),

  h2("6.2 Configuracion de Fortify"),
  p("Archivo: config/fortify.php"),
  screenshotPlaceholder("Contenido del archivo fortify.php"),
  p("En este archivo configuramos las funcionalidades que Fortify maneja:"),
  emptyLine(),
  bulletBold("Features::registration() ", "- Permite que los usuarios se registren"),
  bulletBold("Features::resetPasswords() ", "- Permite recuperar contrasena por email"),
  bulletBold("Features::emailVerification() ", "- Requiere que el usuario verifique su email"),
  bulletBold("Features::twoFactorAuthentication() ", "- Autenticacion de doble factor con TOTP"),
  bulletBold("Features::passkeys() ", "- Login con passkeys (WebAuthn/FIDO2)"),
  emptyLine(),
  p("Archivo: app/Providers/FortifyServiceProvider.php"),
  screenshotPlaceholder("Contenido del archivo FortifyServiceProvider.php"),
  p("Este provedor registra las vistas de Inertia para cada pagina de autenticacion:"),
  bullet("Login -> auth/Login"),
  bullet("Registro -> auth/Register"),
  bullet("Recuperar contrasena -> auth/ForgotPassword"),
  bullet("Restablecer contrasena -> auth/ResetPassword"),
  bullet("Verificar email -> auth/VerifyEmail"),
  bullet("Doble factor -> auth/TwoFactorChallenge"),
  emptyLine(),

  h2("6.3 Creacion de Usuarios"),
  p("Archivo: app/Actions/Fortify/CreateNewUser.php"),
  screenshotPlaceholder("Contenido del archivo CreateNewUser.php"),
  p(
    "Cuando un usuario se registra, este action se encarga de:"
  ),
  bullet("Validar que el nombre, email y contrasena cumplan con las reglas"),
  bullet("Crear el usuario en la base de datos"),
  bullet("Crear automaticamente un equipo personal para el usuario"),
  p(
    "Todo esto ocurre dentro de una transaccion de base de datos (DB::transaction), lo que garantiza que si algo falla, no se quede a medias."
  ),
  emptyLine(),

  h2("6.4 Proteccion de Rutas"),
  p("De vuelta en routes/web.php, vemos que las rutas de equipos y clientes estan protegidas:"),
  code("Route::middleware(['auth', 'verified'])->group(function () {"),
  code("    Route::resource('equipos', EquipoController::class);"),
  code("    Route::resource('clientes', ClienteController::class);"),
  code("});"),
  p(
    "Esto significa que si un usuario no esta logueado o no ha verificado su email, Laravel lo redirigira automaticamente a la pagina de login."
  ),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 7: RESULTS
// ========================
const ch7 = [
  h1("7. Resultados y Capturas"),
  p(
    "En esta seccion se muestran las capturas de pantalla del proyecto funcionando. Aqui debes agregar las capturas de tu aplicacion."
  ),
  emptyLine(),

  h2("7.1 Pagina de Bienvenida"),
  screenshotPlaceholder("Pagina principal de bienvenida de Manteka"),
  emptyLine(),

  h2("7.2 Formulario de Login"),
  screenshotPlaceholder("Formulario de inicio de sesion"),
  emptyLine(),

  h2("7.3 Formulario de Registro"),
  screenshotPlaceholder("Formulario de registro de nuevo usuario"),
  emptyLine(),

  h2("7.4 Dashboard Principal"),
  screenshotPlaceholder("Panel principal despues de iniciar sesion"),
  emptyLine(),

  h2("7.5 Listado de Equipos"),
  screenshotPlaceholder("Tabla con la lista de todos los equipos registrados"),
  emptyLine(),

  h2("7.6 Formulario de Crear Equipo"),
  screenshotPlaceholder("Formulario para registrar un nuevo equipo"),
  emptyLine(),

  h2("7.7 Formulario de Editar Equipo"),
  screenshotPlaceholder("Formulario para editar un equipo existente"),
  emptyLine(),

  h2("7.8 Listado de Clientes"),
  screenshotPlaceholder("Tabla con la lista de todos los clientes registrados"),
  emptyLine(),

  h2("7.9 Formulario de Crear Cliente"),
  screenshotPlaceholder("Formulario para registrar un nuevo cliente"),
  emptyLine(),

  h2("7.10 Base de Datos"),
  screenshotPlaceholder("Estructura de las tablas en la base de datos SQLite"),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// CHAPTER 8: CONCLUSIONS
// ========================
const ch8 = [
  h1("8. Conclusiones"),
  emptyLine(),
  p(
    "A lo largo de este informe, documentamos paso a paso el desarrollo del proyecto Manteka, una aplicacion web para la gestion de un servicio tecnico de computadores, construida con el framework Laravel."
  ),
  emptyLine(),
  p(
    "Durante el proceso de desarrollo, aprendimos y aplicamos los conceptos fundamentales de Laravel:"
  ),
  bullet("Modelos para representar las entidades del sistema (Equipo, Cliente)"),
  bullet("Migraciones para crear y versionar la estructura de la base de datos"),
  bullet("Controladores para manejar la logica de las peticiones HTTP"),
  bullet("Form Requests para validar los datos de entrada de forma segura"),
  bullet("Rutas para definir los endpoints de la aplicacion"),
  bullet("Inertia.js y Vue.js para crear una interfaz de usuario moderna y reactiva"),
  bullet("Fortify para implementar un sistema completo de autenticacion"),
  emptyLine(),
  p(
    "Laravel se demostro como una herramienta poderosa y elegante que facilita enormemente el desarrollo de aplicaciones web. Su sintaxis clara, su excelente documentacion y su ecosistema de paquetes nos permitieron construir una aplicacion funcional, segura y bien estructurada en un tiempo razonable."
  ),
  emptyLine(),
  p(
    "El proyecto Manteka cumple con los requisitos basicos de un sistema CRUD con autenticacion, y sirve como base para futuras mejoras como la implementacion de reportes, notificaciones por correo, o la integracion con un sistema de facturacion."
  ),
  emptyLine(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

// ========================
// BUILD DOCUMENT
// ========================
const doc = new Document({
  creator: "Magnujuda",
  title: "Guia Practica: Desarrollo de Aplicaciones Web con Laravel - Proyecto Manteka",
  description: "Documentacion paso a paso del proyecto Manteka",
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22 },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1.2),
            right: convertInchesToTwip(1),
          },
        },
      },
      children: [
        ...coverPage,
        ...tocPage,
        ...ch1,
        ...ch2,
        ...ch3,
        ...ch4,
        ...ch5,
        ...ch6,
        ...ch7,
        ...ch8,
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(
  "/home/magnujuda/Documentos/3inf/manteka/Informe_Manteka_Laravel.docx",
  buffer
);
console.log("Documento generado exitosamente: Informe_Manteka_Laravel.docx");
