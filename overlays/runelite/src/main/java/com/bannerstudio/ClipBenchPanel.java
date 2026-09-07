package com.bannerstudio;

import java.awt.BorderLayout;
import java.awt.GridLayout;
import javax.inject.Inject;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import net.runelite.client.ui.PluginPanel;
import net.runelite.client.util.LinkBrowser;

public class ClipBenchPanel extends PluginPanel
{
	@Inject
	ClipBenchPanel(ClipBenchConfig config)
	{
		setBorder(new EmptyBorder(8, 8, 8, 8));
		setLayout(new BorderLayout(8, 8));
		add(new JLabel("<html>Local clip bench. Opens in your browser. This panel does not click.</html>"), BorderLayout.NORTH);
		final JPanel actions = new JPanel(new GridLayout(0, 1, 6, 6));
		final JButton open = new JButton("Open clip bench");
		open.addActionListener(e -> LinkBrowser.browse(config.clipsUrl()));
		actions.add(open);
		add(actions, BorderLayout.CENTER);
	}
}
