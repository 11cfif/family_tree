package ru.cfif.cs.familytree.controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class JsonDataSerializer extends JsonSerializer<LocalDate> {

	private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	@Override
	public void serialize(LocalDate date, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		String dateString = date.format(FORMATTER);
		gen.writeString(dateString);
	}
}
