package com.bannerstudio;

import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.io.File;
import javax.inject.Inject;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.filechooser.FileNameExtensionFilter;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.ui.PluginPanel;
import net.runelite.client.util.LinkBrowser;

public class BannerStudioPanel extends PluginPanel
{
	private final BannerStudioConfig config;
	private final ConfigManager configs;
	private final JLabel pathLabel = new JLabel("No overlay JPEG.");

	@Inject
	BannerStudioPanel(BannerStudioConfig config, ConfigManager configs)
	{
		this.config = config;
		this.configs = configs;
		setBorder(new EmptyBorder(8, 8, 8, 8));
		setLayout(new BorderLayout(8, 8));

		final JLabel blurb = new JLabel("<html>Local JPEG overlay. The desk opens in your browser. This panel does not click.</html>");
		add(blurb, BorderLayout.NORTH);

		final JPanel actions = new JPanel(new GridLayout(0, 1, 6, 6));
		final JButton open = new JButton("Open desk");
		open.addActionListener(e -> LinkBrowser.browse(config.deskUrl()));
		final JButton pick = new JButton("Pick overlay JPEG");
		pick.addActionListener(e -> pickFile());
		final JButton clear = new JButton("Clear overlay");
		clear.addActionListener(e -> {
			configs.setConfiguration("bannerstudio", "overlayPath", "");
			pathLabel.setText("No overlay JPEG.");
		});
		actions.add(open);
		actions.add(pick);
		actions.add(clear);
		actions.add(pathLabel);
		add(actions, BorderLayout.CENTER);
	}

	private void pickFile()
	{
		final JFileChooser box = new JFileChooser();
		box.setFileFilter(new FileNameExtensionFilter("JPEG", "jpg", "jpeg"));
		if (box.showOpenDialog(this) != JFileChooser.APPROVE_OPTION)
		{
			return;
		}
		final File file = box.getSelectedFile();
		if (file == null)
		{
			return;
		}
		configs.setConfiguration("bannerstudio", "overlayPath", file.getAbsolutePath());
		pathLabel.setText(file.getName());
	}
}
