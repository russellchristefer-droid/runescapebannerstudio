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
import net.runelite.client.ui.overlay.OverlayManager;

@PluginDescriptor(
	name = "Banner Studio",
	description = "Sidebar: open the banner desk, pick a local JPEG overlay. Not a bot.",
	tags = {"banner", "stream", "overlay"}
)
public class BannerStudioPlugin extends Plugin
{
	@Inject
	private ClientToolbar toolbar;
	@Inject
	private OverlayManager overlays;
	@Inject
	private BannerStudioOverlay overlay;
	@Inject
	private BannerStudioPanel panel;

	private NavigationButton button;

	@Override
	protected void startUp()
	{
		overlays.add(overlay);
		button = NavigationButton.builder()
			.tooltip("Banner Studio")
			.icon(new BufferedImage(16, 16, BufferedImage.TYPE_INT_RGB))
			.panel(panel)
			.build();
		toolbar.addNavigation(button);
	}

	@Override
	protected void shutDown()
	{
		overlays.remove(overlay);
		if (button != null)
		{
			toolbar.removeNavigation(button);
		}
	}

	@Provides
	BannerStudioConfig provideConfig(ConfigManager manager)
	{
		return manager.getConfig(BannerStudioConfig.class);
	}
}
