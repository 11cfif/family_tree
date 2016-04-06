package ru.cfif.cs.familytree.server;

import org.eclipse.jetty.server.Server;
import org.springframework.beans.factory.annotation.Required;

public class JettyStarter {
	private Server jettyServer;

	public void start() throws Exception {
		jettyServer.start();
	}

	@Required
	public void setJettyServer(final Server jettyServer) {
		this.jettyServer = jettyServer;
	}
}
