const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, LevelFormat, Header, Footer, PageNumber
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 100, bottom: 100, left: 150, right: 150 };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, font: "Times New Roman" })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 26, font: "Times New Roman" })]
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60, line: 360 },
    indent: { firstLine: 720 },
    children: [new TextRun({ text, size: 24, font: "Times New Roman", ...opts })]
  });
}

function paraNoIndent(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60, line: 360 },
    children: [new TextRun({ text, size: 24, font: "Times New Roman", ...opts })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 24, font: "Times New Roman" })]
  });
}

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map((text, i) => new TableCell({
      borders,
      margins: cellMargins,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: isHeader ? { fill: "1E3A5F", type: ShadingType.CLEAR } : undefined,
      children: [new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({
          text,
          size: 22,
          font: "Times New Roman",
          bold: isHeader,
          color: isHeader ? "FFFFFF" : "000000"
        })]
      })]
    }))
  });
}

const TABLE_WIDTH = 9360;
const colWidths = [4680, 4680];

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "-",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  styles: {
    default: {
      document: { run: { font: "Times New Roman", size: 24 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1700, right: 1134, bottom: 1134, left: 1701 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Отчёт по демонстрационному экзамену", size: 18, font: "Times New Roman", color: "888888" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Страница ", size: 20, font: "Times New Roman" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 20, font: "Times New Roman" }),
            new TextRun({ text: " из ", size: 20, font: "Times New Roman" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 20, font: "Times New Roman" }),
          ]
        })]
      })
    },
    children: [

      // ── ТИТУЛЬНЫЙ ЛИСТ ──────────────────────────────────────────────────────
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1400, after: 200 },
        children: [new TextRun({ text: "ГОСУДАРСТВЕННОЕ ПРОФЕССИОНАЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ", size: 24, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 600 },
        children: [new TextRun({ text: "Демонстрационный экзамен", size: 24, font: "Times New Roman" })] }),

      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 200 },
        children: [new TextRun({ text: "ОТЧЁТ", size: 40, bold: true, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 },
        children: [new TextRun({ text: "по разработке информационной системы", size: 28, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 600 },
        children: [new TextRun({ text: "«AutoRent — Сервис бронирования автомобилей»", size: 28, bold: true, font: "Times New Roman" })] }),

      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800, after: 80 },
        children: [new TextRun({ text: "Выполнил: ________________________", size: 24, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "Специальность: 09.02.07", size: 24, font: "Times New Roman" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "Дата: ________________", size: 24, font: "Times New Roman" })] }),

      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800 },
        children: [new TextRun({ text: "2025", size: 24, font: "Times New Roman" })] }),

      // Разрыв страницы
      new Paragraph({ children: [new PageBreak()] }),

      // ── 1. ЦЕЛЬ РАБОТЫ ──────────────────────────────────────────────────────
      heading1("1. Цель работы"),
      para("Целью демонстрационного экзамена является разработка веб-приложения для автоматизации процесса бронирования автомобилей. Система предназначена для предоставления пользователям возможности регистрации, авторизации и подачи заявок на аренду транспортных средств, а также для управления этими заявками администратором."),

      // ── 2. ТЕХНОЛОГИИ ───────────────────────────────────────────────────────
      heading1("2. Используемые технологии"),
      paraNoIndent("При разработке системы применялись следующие языки программирования и инструменты:"),
      new Paragraph({ spacing: { before: 80, after: 80 } }),

      new Table({
        width: { size: TABLE_WIDTH, type: WidthType.DXA },
        columnWidths: colWidths,
        rows: [
          tableRow(["Технология / язык", "Назначение"], true),
          tableRow(["Python 3 / Django 6", "Серверная логика, ORM, маршрутизация"]),
          tableRow(["SQLite 3", "Реляционная база данных"]),
          tableRow(["HTML 5", "Разметка страниц (шаблоны Django)"]),
          tableRow(["CSS 3", "Стилизация интерфейса, адаптивность"]),
          tableRow(["JavaScript", "Динамическое обновление данных на странице"]),
        ]
      }),

      new Paragraph({ spacing: { before: 120 } }),

      // ── 3. СТРУКТУРА БД ─────────────────────────────────────────────────────
      heading1("3. Структура базы данных"),
      para("База данных содержит три таблицы, связанные между собой отношениями «один ко многим». Описание таблиц представлено ниже."),

      heading2("Таблица User (Пользователь)"),
      paraNoIndent("Расширяет стандартную модель Django AbstractUser. Содержит поля:"),
      bullet("id — первичный ключ (автоинкремент)"),
      bullet("email — уникальный адрес электронной почты (используется для входа)"),
      bullet("full_name — полное имя пользователя"),
      bullet("phone_number — номер телефона"),
      bullet("driver_license — серия и номер водительского удостоверения"),
      bullet("password — хэш пароля"),

      heading2("Таблица Car (Автомобиль)"),
      paraNoIndent("Содержит информацию о доступных автомобилях:"),
      bullet("id — первичный ключ"),
      bullet("name — марка и модель автомобиля"),
      bullet("price — стоимость аренды в сутки"),
      bullet("description — описание (необязательное)"),
      bullet("image — фотография автомобиля (загружается через админ-панель)"),

      heading2("Таблица Booking (Заявка)"),
      paraNoIndent("Хранит заявки пользователей на аренду. Связана с User и Car через внешние ключи:"),
      bullet("id — первичный ключ"),
      bullet("user — ссылка на пользователя (FK → User, связь 1:N)"),
      bullet("car — ссылка на автомобиль (FK → Car, связь 1:N)"),
      bullet("booking_date — дата начала аренды"),
      bullet("status — статус заявки: «Новое», «Подтверждено», «Отклонено»"),
      bullet("created_at — дата и время создания заявки"),

      new Paragraph({ spacing: { before: 100 } }),
      para("ER-диаграмма системы сгенерирована с помощью пакета django-extensions командой python manage.py graph_models main -o er_diagram.png и включает сущности со всеми связями и их типами."),

      // ── 4. ФУНКЦИОНАЛ ───────────────────────────────────────────────────────
      heading1("4. Описание функционала системы"),

      heading2("4.1. Страница регистрации (/register/)"),
      para("Форма регистрации нового пользователя. Пользователь вводит ФИО, адрес электронной почты, номер телефона, серию и номер водительского удостоверения, пароль и его подтверждение. Предусмотрена проверка уникальности email и совпадения паролей. После успешной регистрации пользователь автоматически авторизуется и перенаправляется в личный кабинет."),

      heading2("4.2. Страница авторизации (/login/)"),
      para("Форма входа в систему по email и паролю. При неверных данных выводится сообщение об ошибке. Аутентификация реализована через стандартный механизм Django с переопределением поля USERNAME_FIELD на email."),

      heading2("4.3. Список заявок (/my_bookings/)"),
      para("Личный кабинет пользователя. Отображает все поданные заявки с указанием марки автомобиля, фотографии, даты аренды, стоимости и текущего статуса. Статус подсвечивается цветом: жёлтый — новое, зелёный — подтверждено, красный — отклонено. Доступна кнопка создания новой заявки."),

      heading2("4.4. Создание заявки (/create_booking/)"),
      para("Форма для подачи заявки на аренду. Пользователь выбирает автомобиль из выпадающего списка — при этом через JavaScript динамически отображается цена и описание выбранного автомобиля. Затем указывается дата аренды (выбор даты не ранее сегодняшнего дня). После отправки заявка сохраняется со статусом «Новое»."),

      heading2("4.5. Панель администратора (/admin/)"),
      para("Стандартная административная панель Django с кастомными настройками. Администратор может управлять пользователями (просмотр email, ФИО, телефона, номера ВУ), автомобилями (добавление, редактирование, загрузка фотографий), а также заявками (просмотр, изменение статуса непосредственно в списке, фильтрация по статусу и дате)."),

      // ── 5. АДАПТИВНОСТЬ ─────────────────────────────────────────────────────
      heading1("5. Адаптивность и дизайн"),
      para("Интерфейс системы реализован с использованием собственного CSS без внешних зависимостей. Применяется единая цветовая схема: тёмно-синяя навигационная панель (#1E3A5F), белый фон карточек и светло-серый фон страницы. Для адаптации под мобильные устройства используется медиазапрос @media (max-width: 600px), который перестраивает компоновку элементов под небольшие экраны."),

      // ── 6. ЗАКЛЮЧЕНИЕ ───────────────────────────────────────────────────────
      heading1("6. Заключение"),
      para("В ходе демонстрационного экзамена была разработана полнофункциональная веб-информационная система «AutoRent» для автоматизации аренды автомобилей. Реализованы регистрация и авторизация пользователей, подача и просмотр заявок, а также панель администратора для управления данными. Система разработана с использованием более двух языков программирования, имеет интуитивно понятный адаптивный интерфейс, нормализованную базу данных с корректными связями между таблицами и соответствует требованиям предметной области."),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Users\\elise\\Desktop\\FINAL\\demo\\try4NORM\\report.docx", buffer);
  console.log("OK: report.docx создан");
});
