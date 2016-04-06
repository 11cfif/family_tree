package ru.cfif.cs.familytree;

import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Main {
	public static void main(final String[] args) {
		new FileSystemXmlApplicationContext("classpath:application.xml").start();
	}
}
