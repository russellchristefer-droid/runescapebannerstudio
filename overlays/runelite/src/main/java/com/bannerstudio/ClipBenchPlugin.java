/*
 * Sideload plugin. Not Plugin Hub.
 * Credits: RuneLite (BSD-2-Clause), Jagex Limited marks, studio LICENSE.
 */
package com.bannerstudio;

import com.google.inject.Provides;
import java.awt.image.BufferedImage;
import javax.inject.Inject;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.plugins.Plugin;
import net.runelite.client.plugins.PluginDescriptor;
import net.runelite.client.ui.ClientToolbar;
import net.runelite.client.ui.NavigationButton;

@PluginDescriptor(
	name = "Clip bench",
	description = "Opens the standalone clip bench in a browser. Not a bot.",
	tags = {"clip", "video", "stream"}
)
public class ClipBenchPlugin extends Plugin
{
	@Inject
	private ClientToolbar toolbar;
	@Inject
	private ClipBenchPanel panel;

	private NavigationButton button;

	@Override
	protected void startUp()
	{
		button = NavigationButton.builder()
			.tooltip("Clip bench")
			.icon(new BufferedImage(16, 16, BufferedImage.TYPE_INT_RGB))
			.panel(panel)
			.build();
		toolbar.addNavigation(button);
	}

	@Override
	protected void shutDown()
	{
		if (button != null)
		{
			toolbar.removeNavigation(button);
		}
	}

	@Provides
	ClipBenchConfig provideConfig(ConfigManager manager)
	{
		return manager.getConfig(ClipBenchConfig.class);
	}
}
