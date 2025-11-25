package com.example.videostream.repository;


import com.example.videostream.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VideoRepository extends JpaRepository<Video, Long> {
}