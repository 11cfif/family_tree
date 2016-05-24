package ru.cfif.cs.familytree.controllers;

import java.io.IOException;
import java.time.*;
import java.util.Arrays;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.TextNode;



public class JsonDataDeserializer extends JsonDeserializer<LocalDate> {

	private static final String[] SEPARATORS = new String[] {"/", ",", ".", "-"};

	@Override
	public LocalDate deserialize(JsonParser jp, DeserializationContext ctx) throws IOException {
		ObjectCodec oc = jp.getCodec();
		TextNode node = oc.readTree(jp);
		String dateString = node.textValue().replace(SEPARATORS[2], SEPARATORS[1]);
		if (dateString.length() == 0) {
			return null;
		}
		String[] numbers = null;
		for (String SEPARATOR : SEPARATORS) {
			if (dateString.contains(SEPARATOR)) {
				numbers = dateString.split(SEPARATOR);
				break;
			}
		}
		if (numbers == null)
			throw new IOException(dateString + " does not contain any of the separators :" + Arrays.toString(SEPARATORS));
		if (numbers.length != 3)
			throw new IOException(dateString + " contains an incorrect number of separators.");
		int year;
		int month = Integer.valueOf(numbers[1]);
		int day;
		if (numbers[0].length() == 4) {
			year = Integer.valueOf(numbers[0]);
			day = Integer.valueOf(numbers[2]);
		} else {
			year = Integer.valueOf(numbers[2]);
			day = Integer.valueOf(numbers[0]);
		}
		return LocalDate.of(year, month, day);
	}
}
