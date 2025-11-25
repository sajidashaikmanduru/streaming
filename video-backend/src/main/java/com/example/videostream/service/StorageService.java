package com.example.videostream.service;

import org.apache.commons.io.input.BoundedInputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import jakarta.annotation.PostConstruct;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageService {
    private final Path root;

    public StorageService(@Value("${app.storage.path}") String storagePath) {
        this.root = Paths.get(storagePath).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init() {
        try {
            if (Files.notExists(root)) {
                Files.createDirectories(root);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage at " + root, e);
        }
    }

    public String store(MultipartFile file) {
        String original = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = "";
        int i = original.lastIndexOf('.');
        if (i >= 0) ext = original.substring(i);
        String stored = UUID.randomUUID().toString() + ext;
        Path target = root.resolve(stored);
        try (InputStream in = file.getInputStream();
             OutputStream out = Files.newOutputStream(target)) {
            in.transferTo(out);
            return stored;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + original, e);
        }
    }

    public File getFile(String filename) {
        return root.resolve(filename).toFile();
    }

    public Resource getResourceRegion(String filename, long start, long length) {
        File file = getFile(filename);
        try {
            FileInputStream fis = new FileInputStream(file);
            long skipped = fis.skip(start);
            if (skipped < start) {
                // handle case where skip didn't skip full amount
                fis.close();
                throw new RuntimeException("Could not skip to requested start position");
            }
            BoundedInputStream bis = new BoundedInputStream(fis, length);
            return new InputStreamResource(bis);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file region for " + filename, e);
        }
    }

    public Resource getResource(String filename) {
        File file = getFile(filename);
        try {
            return new InputStreamResource(new FileInputStream(file));
        } catch (FileNotFoundException e) {
            throw new RuntimeException("File not found: " + filename, e);
        }
    }

    public long getSize(String filename) {
        File file = getFile(filename);
        return file.length();
    }

    public boolean delete(String filename) {
        try {
            return Files.deleteIfExists(root.resolve(filename));
        } catch (IOException e) {
            return false;
        }
    }
}
