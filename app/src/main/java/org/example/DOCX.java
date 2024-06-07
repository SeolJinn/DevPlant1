package org.example;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DOCX {
    public String readDocxContent(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        XWPFDocument document = new XWPFDocument(fis);
        StringBuilder sb = new StringBuilder();

        for (XWPFParagraph paragraph : document.getParagraphs()) {
            sb.append(paragraph.getText());
            sb.append("\n");
        }

        fis.close();
        return sb.toString();
    }

    public List<String> getKeys(String filePath) throws IOException {
        List<String> keys = new ArrayList<>();
        FileInputStream fis = new FileInputStream(filePath);
        XWPFDocument document = new XWPFDocument(fis);

        Pattern pattern = Pattern.compile("\\{\\{(.+?)\\}\\}");

        for (XWPFParagraph paragraph : document.getParagraphs()) {
            Matcher matcher = pattern.matcher(paragraph.getText());
            while (matcher.find()) {
                keys.add(matcher.group(1));
            }
        }

        fis.close();
        return keys;
    }

    public void replaceKeys(String filePath, Map<String, String> replacements) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        XWPFDocument document = new XWPFDocument(fis);

        for (XWPFParagraph paragraph : document.getParagraphs()) {
            for (XWPFRun run : paragraph.getRuns()) {
                String text = run.getText(0);
                if (text != null) {
                    for (Map.Entry<String, String> entry : replacements.entrySet()) {
                        if (text.contains("{{" + entry.getKey() + "}}")) {
                            text = text.replace("{{" + entry.getKey() + "}}", entry.getValue());
                            run.setText(text, 0);
                        }
                    }
                }
            }
        }

        fis.close();
        FileOutputStream fos = new FileOutputStream(filePath);
        document.write(fos);
        fos.close();
    }
}