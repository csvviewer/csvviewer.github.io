import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is a CSV file?",
    a: "A CSV (Comma-Separated Values) file is a plain text file that stores tabular data, with each line representing one row and commas separating the individual values within that row.",
  },
  {
    q: "What does CSV stand for?",
    a: "CSV stands for Comma-Separated Values, describing both the file format and the character most commonly used to separate data fields within it.",
  },
  {
    q: "What is a CSV delimiter?",
    a: "A delimiter is the character used to separate individual values within a row. The comma is the default in a CSV file, though semicolons, tabs, and pipes are also used depending on the source of the data.",
  },
  {
    q: "What is the difference between CSV and Excel (XLSX)?",
    a: "CSV is a plain text format that stores only raw values, with no formulas, formatting, or multiple sheets. XLSX is Excel's native binary format, capable of storing formulas, multiple sheets, and visual formatting alongside the data.",
  },
  {
    q: "What is the difference between CSV and TSV?",
    a: "The only structural difference is the delimiter: CSV separates values with commas, while TSV (Tab-Separated Values) uses tab characters instead. Both store the same kind of plain-text tabular data.",
  },
  {
    q: "Can a CSV file contain multiple sheets?",
    a: "No. A CSV file can only represent a single table of data. If you need multiple sheets, that requires a spreadsheet format like XLSX rather than CSV.",
  },
  {
    q: "What is a header row in a CSV file?",
    a: "A header row is the first line of a CSV file when it's used to name each column, rather than containing data. Not every CSV file has one — without it, the first line is treated as regular data.",
  },
  {
    q: "How do I view a CSV file online?",
    a: "Upload your .csv file or paste its contents into the tool above. It's parsed and displayed as a table in your browser automatically, with no software installation required.",
  },
  {
    q: "How do I edit a CSV file online?",
    a: "After your file loads as a table, click into any cell to edit its value directly, or use the row and column controls to add or remove data. Download the result as an updated CSV file when finished.",
  },
  {
    q: "Can I open CSV files without Excel?",
    a: "Yes. Since a CSV file is plain text, any tool that can read and render that structure — including this browser-based viewer — can open it without Excel or any other spreadsheet software installed.",
  },
  {
    q: "Can I download my edited CSV file?",
    a: "Yes. Once you've made your edits, you can export and download the updated table as a standard .csv file, ready to use anywhere CSV files are accepted.",
  },
  {
    q: "Can I search inside a CSV file online?",
    a: "Yes. The search function locates matching values anywhere in the table and highlights them, making it fast to confirm whether specific data exists and where it's located.",
  },
  {
    q: "Can I sort or filter CSV data online?",
    a: "Yes. Sorting reorders rows by a chosen column's values, while filtering hides rows that don't match a condition you set — both without altering the underlying data.",
  },
  {
    q: "Can I remove duplicate rows from a CSV file?",
    a: "Yes. Exact duplicate rows can be identified and removed, which is especially useful after combining data from multiple exported files.",
  },
  {
    q: "Why does my CSV file display incorrectly?",
    a: "This is usually caused by an unescaped delimiter inside a data value, an encoding mismatch, or a line break inside an unquoted field — all covered in detail in the file structure section above.",
  },
  {
    q: "Why are the characters in my CSV corrupted or garbled?",
    a: "Corrupted characters typically result from an encoding mismatch — the file was saved in one character encoding but is being read as if it were UTF-8 (or vice versa). Re-saving the source file as UTF-8 usually resolves it.",
  },
  {
    q: "Why are my CSV columns misaligned?",
    a: "Misaligned columns are almost always caused by a comma (or other delimiter) inside a data value that wasn't wrapped in quotes, which shifts every value after it one column to the right.",
  },
  {
    q: "Why does a comma inside my data break the columns?",
    a: "Because a CSV parser splits fields purely by looking for the delimiter character. If a value itself contains that character and isn't quoted, the parser can't tell it apart from an actual field separator.",
  },
  {
    q: "Why does my CSV file open as one single column?",
    a: "This usually means the file uses a different delimiter than the one being assumed — for example, a semicolon-delimited file opened by a tool expecting commas will show every value crammed into a single column.",
  },
  {
    q: "Can large CSV files be opened in a browser?",
    a: "Yes, though very large files (tens of thousands of rows or more) take longer to load and render, since the browser needs to process and display the full dataset.",
  },
  {
    q: "Is there a file size limit for viewing or editing CSV files?",
    a: "There's no fixed limit, but practical performance depends on your browser's available memory — larger files render more slowly as size increases.",
  },
  {
    q: "Does this tool support delimiters other than commas?",
    a: "Yes. Semicolon, tab, and pipe-delimited files are also supported and detected automatically when the file is loaded.",
  },
  {
    q: "Is it safe to view CSV files online?",
    a: "Yes. Files are read and processed directly in your browser rather than uploaded to a server, so the contents aren't transmitted elsewhere just to be viewed or edited.",
  },
  {
    q: "Does this tool store or upload my file to a server?",
    a: "No. Processing happens locally in your browser, so there's nothing retained on a server after you close or refresh the page.",
  },
  {
    q: "Is my data private when I use this CSV viewer?",
    a: "Since your file is processed locally rather than sent to a server, its contents stay on your device throughout the viewing and editing process.",
  },
  {
    q: "Why did my leading zeros disappear from my CSV (e.g., ZIP codes)?",
    a: "This typically happens when a CSV file is opened directly in Excel, which auto-converts number-like text and strips leading zeros. The underlying CSV data itself isn't affected — only how Excel displays it after import.",
  },
  {
    q: "Why did dates change format in my CSV file?",
    a: "Like leading zeros, this is usually an Excel auto-formatting behavior applied when a CSV is imported, not a change to the raw data in the file itself.",
  },
  {
    q: "Can I edit a CSV file on my phone or tablet?",
    a: "Yes. Since the tool runs in the browser, it works on mobile and tablet devices the same way it does on desktop, without requiring any app installation.",
  },
  {
    q: "What happens to line breaks inside a CSV cell?",
    a: "A line break inside a quoted field is treated as part of that field's data, not as the start of a new row — the parser keeps reading until it reaches the closing quote.",
  },
  {
    q: "Can I convert my CSV file to another format after editing?",
    a: "Download your edited data as CSV first, then use a dedicated conversion tool if you need a different format, such as JSON or XLSX, for your next step.",
  },
];

export function HomePageContent() {
  return (
    <article
      id="guide"
      className="mt-16 pt-12 border-t border-border space-y-16 text-foreground max-w-4xl mx-auto"
    >
      {/* What Is a CSV File? */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">What Is a CSV File?</h2>
        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            A CSV file — short for{" "}
            <strong className="text-foreground">Comma-Separated Values</strong> — is a plain text
            file that stores tabular data. Instead of the rows and columns being drawn visually,
            like in a spreadsheet program, each row of data is written as a single line of text, and
            each value in that row is separated by a comma. Open a CSV file in a plain text editor
            and you'll see something like this:
          </p>
          <div className="rounded-md border border-border bg-muted/60 p-4 font-mono text-xs text-foreground overflow-x-auto">
            name,email,city
            <br />
            Sarah Khan,sarah@example.com,Dhaka
            <br />
            Tom Reyes,tom@example.com,Manila
          </div>
          <p>
            The first line is usually a header row — it names each column so the data that follows
            can be understood. Every line after that is a record: one row of related values, in the
            same order as the header.
          </p>
          <p>
            Because a CSV file is plain text, it can be opened, read, and edited by almost any
            program, on any operating system, without depending on a specific piece of software.
            That's also exactly why a browser-based CSV viewer works so well: the browser only needs
            to read the text, split it by its delimiter, and lay it out as a table.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            CSV File Structure (Rows, Columns, Fields)
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A CSV file is built from three basic units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
            <li>
              <strong className="text-foreground">A row</strong> is one complete line of data — one
              record, such as one person, one order, or one product.
            </li>
            <li>
              <strong className="text-foreground">A column</strong> is a category of data that runs
              down the file — the same position in every row, such as &ldquo;email&rdquo; or
              &ldquo;city.&rdquo;
            </li>
            <li>
              <strong className="text-foreground">A field (or cell)</strong> is a single value: the
              intersection of one row and one column, like &ldquo;sarah@example.com.&rdquo;
            </li>
          </ul>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The header row defines what each column represents. If a CSV file has no header row, the
            first line is just data like any other, and column meaning has to be inferred from
            position or context.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Common Delimiters (Comma, Semicolon, Tab, Pipe)
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The comma is the default delimiter in a CSV file, but it isn't the only one used in
            practice. Depending on the software or region a file came from, you may also see:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
            <li>
              <strong className="text-foreground">Semicolon (;)</strong> — common in regions where
              the comma is already used as a decimal separator
            </li>
            <li>
              <strong className="text-foreground">Tab</strong> — often used in files exported with a
              .tsv extension, but functionally similar to CSV
            </li>
            <li>
              <strong className="text-foreground">Pipe (|)</strong> — sometimes used when the data
              itself frequently contains commas, to avoid extra escaping
            </li>
          </ul>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A CSV viewer needs to correctly identify which delimiter a file is using; guessing wrong
            is one of the most common reasons a file looks broken when opened (more on this in the
            formatting section below).
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            CSV vs Excel (XLSX) — Key Differences
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            CSV and Excel's native format (XLSX) are often used for the same kind of data, but they
            are structurally very different:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
            <li>
              <strong className="text-foreground">CSV is plain text.</strong> It stores only raw
              values — no fonts, colors, formulas, multiple sheets, or cell formatting.
            </li>
            <li>
              <strong className="text-foreground">XLSX is a binary/compressed format.</strong> It
              can store formulas, multiple sheets, formatting, charts, and metadata alongside the
              data.
            </li>
          </ul>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            This difference matters in practice: a CSV file has no concept of &ldquo;bold&rdquo; or
            &ldquo;currency formatting,&rdquo; and it can only ever contain one sheet of data. When
            you export or download from a CSV editor, you're getting the raw values only — which is
            often exactly what's needed for imports, data transfers, and system-to-system exchanges.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            CSV vs TSV and Other Delimited Formats
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            TSV (Tab-Separated Values) is structurally identical to CSV — rows of plain text data —
            except fields are separated by a tab character instead of a comma. TSV is sometimes
            preferred for data that naturally contains a lot of commas (like descriptions or
            addresses), since it avoids the need to quote every field. A CSV viewer that also
            handles tab-delimited files can open both formats without any extra steps.
          </p>
        </div>
      </section>

      {/* How to View a CSV File Online */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          How to View a CSV File Online
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Viewing a CSV file online means letting your browser do what a spreadsheet program would
          normally do: read the raw text, split it into rows and columns, and display it as a table
          you can actually read.
        </p>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Uploading or Importing Your CSV File
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            To view a file, upload it from your device or paste its raw contents directly into the
            tool. There's no need to know the file's delimiter or encoding in advance — the viewer
            detects the structure automatically and renders the table immediately. Nothing about
            viewing a file requires Excel, Google Sheets, or any other spreadsheet software to be
            installed.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Reading the Table View (Rows, Columns, Headers)
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Once a file is loaded, it's displayed as a standard table: the first row (if your file
            has one) becomes the column headers, and every line after that becomes a row of data
            beneath it. You can scroll through the table the same way you would in a spreadsheet,
            with each cell showing exactly the value stored in that position in the original file —
            no reformatting or reinterpretation of the underlying data.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Viewing Large CSV Files in the Browser
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Browser-based rendering has to balance file size against performance. Smaller and
            mid-sized CSV files (a few thousand rows) load and scroll instantly. As files grow into
            the tens of thousands of rows, rendering every cell at once becomes slower, so larger
            files are loaded and displayed progressively to keep the table responsive rather than
            freezing the page. If you're working with an especially large export — for example, a
            full database dump — expect the initial load to take a little longer while the table
            builds.
          </p>
        </div>
      </section>

      {/* How to Edit a CSV File Online */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          How to Edit a CSV File Online
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Viewing shows you the data; editing lets you change it. This tool supports full in-place
          editing of the table it renders, so you can correct, update, or restructure your data
          without switching to another program.
        </p>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Editing Cell Values</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Click into any cell to edit its value directly, the same way you would in a spreadsheet.
            Changes are reflected instantly in the table, and the underlying data structure — which
            row, which column — stays intact unless you explicitly change it. This makes it
            straightforward to fix a typo, correct a price, or update a status across individual
            records without touching anything else in the file.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Adding and Deleting Rows or Columns
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Beyond individual cells, you can restructure the table itself:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
            <li>
              <strong className="text-foreground">Add a row</strong> to insert a new record into the
              dataset
            </li>
            <li>
              <strong className="text-foreground">Delete a row</strong> to remove a record entirely
            </li>
            <li>
              <strong className="text-foreground">Add a column</strong> to introduce a new field
              across every row
            </li>
            <li>
              <strong className="text-foreground">Delete a column</strong> to remove a field you no
              longer need
            </li>
          </ul>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            These operations apply to the whole table at once — adding a column, for instance,
            creates an empty field in that position for every existing row, keeping the structure
            consistent.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Saving and Downloading Your Edited CSV
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Once your edits are complete, download the result as a standard .csv file. The exported
            file follows the same plain-text, comma-separated structure as the original — so it
            opens correctly in Excel, Google Sheets, database import tools, or any other program
            that reads CSV, without requiring any extra conversion step.
          </p>
        </div>
      </section>

      {/* Working With Your Data (Search, Sort, and Filter) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Working With Your Data (Search, Sort, and Filter)
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Viewing and editing cover individual values; search, sort, and filter help you make sense
          of the dataset as a whole — especially once a file grows beyond what you can scan by eye.
        </p>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Searching Within CSV Data</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Searching finds and highlights matching values anywhere in the table, jumping you to the
            relevant cell or row rather than hiding anything. It's the fastest way to confirm
            whether a specific value — an email address, an ID, a product code — exists in the file,
            and exactly where.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Sorting Rows and Columns</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Sorting reorders the rows in the table based on the values in a chosen column, either
            ascending or descending. Sorting a &ldquo;date&rdquo; column brings records into
            chronological order; sorting a &ldquo;price&rdquo; column ranks records from lowest to
            highest (or the reverse) — without changing any of the underlying data, only its display
            order.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Filtering Data by Condition</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Filtering is different from searching: instead of finding a value, filtering hides every
            row that doesn't match a condition you set, leaving only the relevant subset visible.
            This is useful for narrowing a large file down to exactly the records you need to review
            or edit — for example, showing only rows where a &ldquo;status&rdquo; column equals
            &ldquo;pending.&rdquo;
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Removing Duplicate Rows</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Duplicate rows are common in exported data, especially after merging files from multiple
            sources. Identifying and removing exact duplicates cleans the dataset without manually
            scanning every row, and keeps a single accurate copy of each record.
          </p>
        </div>
      </section>

      {/* Understanding CSV File Structure and Formatting Issues */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Understanding CSV File Structure and Formatting Issues
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Most CSV problems aren't random — they come from a small set of predictable causes in how
          the format works. Understanding these makes it far easier to diagnose why a file looks
          wrong.
        </p>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            How Delimiters Affect Table Rendering
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A CSV file is split into columns purely by looking for its delimiter character (usually
            a comma). If a data value itself contains that same character — for example, a
            description field that includes a comma — and the file wasn't written correctly, the
            parser has no way to tell the difference between &ldquo;a comma that separates two
            fields&rdquo; and &ldquo;a comma that's part of the data.&rdquo; The result is that
            everything after that comma shifts one column to the right, and the table looks
            misaligned from that point onward.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Quoted Fields and Commas Inside Data
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The fix, built into the CSV format itself, is quoting. Any field that contains the
            delimiter character, a line break, or a quote character is wrapped in double quotes,
            like this:
          </p>
          <div className="rounded-md border border-border bg-muted/60 p-4 font-mono text-xs text-foreground overflow-x-auto">
            Tom Reyes,&quot;Manila, Philippines&quot;,tom@example.com
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Here, &quot;Manila, Philippines&quot; is treated as a single field because it's enclosed
            in quotes, even though it contains a comma. A correct CSV parser recognizes quoted
            sections and ignores delimiters inside them — this is exactly why a properly built
            viewer can display files that a naive comma-split would break.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Character Encoding (UTF-8) and Corrupted Text
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            &ldquo;Corrupted&rdquo; or garbled characters — letters replaced with strange symbols —
            almost always come down to encoding. Text files store characters as bytes, and the
            encoding is the rule used to translate between bytes and visible characters. UTF-8 is
            the standard most CSV files use today, and it can represent virtually any character in
            any language. If a file was saved in a different encoding (for example, an older
            Windows-specific one) and it's then read assuming UTF-8, any character outside basic
            English letters and numbers can come out wrong. Re-saving or re-exporting the source
            file as UTF-8 is usually the fix.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Newlines Inside Quoted Fields</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A single CSV &ldquo;row,&rdquo; as written in the raw file, doesn't always occupy a
            single line of text. If a quoted field contains a line break — for example, a multi-line
            address or notes field — that line break is part of the data, not a signal that a new
            row has started. A correct parser keeps reading until it finds the closing quote, even
            if that means spanning several physical lines, before treating the row as complete. This
            is a common source of confusion when a file &ldquo;has more rows than expected&rdquo;
            after being opened incorrectly.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Handling Empty or Missing Values
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            An empty field in a CSV file — two delimiters in a row, with nothing between them — is
            different from a field containing a space or a placeholder like &ldquo;N/A.&rdquo; A
            well-built viewer distinguishes a genuinely empty cell from one that merely looks empty,
            which matters when you're searching, filtering, or validating data for completeness.
          </p>
        </div>
      </section>

      {/* Compatibility With Excel, Sheets, and Other Tools */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Compatibility With Excel, Sheets, and Other Tools
        </h2>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Opening CSV Files Exported From This Tool in Excel
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Because the export is a standard, correctly quoted CSV file, it opens cleanly in Excel,
            Google Sheets, Apple Numbers, or any database or programming tool that accepts CSV as an
            import format. There's no proprietary formatting or hidden structure that would prevent
            the file from being read elsewhere.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            One thing worth knowing: opening a CSV directly in Excel can sometimes silently change
            your data on Excel's side — for example, stripping leading zeros from a ZIP code or ID
            number, or auto-converting a text value that looks like a date into an actual date. This
            happens in Excel's import step, not in the CSV file itself, so the underlying data you
            edited and downloaded here remains accurate even if Excel later reinterprets it.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">Converting CSV to Other Formats</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            If your next step requires a different format — such as JSON for a development workflow,
            or XLSX for a formatted spreadsheet — export the edited data as CSV first, then convert
            it using a format-specific tool. Keeping the CSV as the intermediate step preserves a
            plain, portable version of your data before it's transformed into something
            format-specific.
          </p>
        </div>
      </section>

      {/* Is It Safe to View and Edit CSV Files Online? */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Is It Safe to View and Edit CSV Files Online?
        </h2>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            How Your File Is Processed (Local vs Server-Based)
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            When you upload a file, it's read and rendered directly in your browser — the parsing,
            table rendering, editing, and export all happen using your browser's own processing, not
            by sending the file to a remote server for a different program to open. Practically,
            this means your file's contents aren't transmitted anywhere just to be viewed or edited.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Data Retention and File Size Limits
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Because processing happens locally, there's nothing stored on a server after you close
            or refresh the page — there's no file to retain because none was uploaded to begin with.
            File size is limited only by what your browser can comfortably hold and render in
            memory; very large files (tens of thousands of rows or more) may take longer to load,
            but the processing model stays the same regardless of size.
          </p>
        </div>
      </section>

      {/* Common Use Cases for an Online CSV Viewer & Editor */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Common Use Cases for an Online CSV Viewer &amp; Editor
        </h2>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Reviewing Business and Reporting Data
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Exports from CRMs, accounting software, and internal reporting tools routinely come as
            CSV. Rather than opening a full spreadsheet application just to check a few values, this
            tool lets you upload, scan, and correct that data in seconds.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Inspecting E-Commerce or Database Exports
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Product catalogs, order histories, and customer lists exported from e-commerce platforms
            or databases are almost always CSV by default. Viewing and lightly editing these exports
            — fixing a price, updating a SKU, removing a test record — is a common, quick task this
            tool is built for.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground">
            Academic and Research Data Handling
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Datasets shared for research or coursework are frequently distributed as CSV files
            precisely because the format is universal and doesn't depend on any particular software
            license. Being able to open, inspect, and lightly clean a dataset without installing
            anything makes it easier to get started working with the data itself.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-lg border-border bg-card px-4 divide-y divide-border"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-0">
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
